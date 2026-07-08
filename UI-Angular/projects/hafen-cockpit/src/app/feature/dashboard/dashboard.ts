import { Component, inject, signal, Signal, viewChild, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LocalStorageAccessor } from '@cockpit/app/core/local-storage/local-storage-accessor.class';
import { Serializable } from '@cockpit/app/core/types/Basic.type';
import { GridStack, GridStackWidget } from 'gridstack';
import { GridstackComponent, NgGridStackOptions, NgGridStackWidget } from 'gridstack/dist/angular';
import { DashboardService } from './dashboard.service';
import { PegelWidget } from './widgets/pegel-widget/pegel-widget';
import { WeatherWidget } from './widgets/weather-widget/weather-widget';
import { WeatherAlertWidget } from './widgets/weather-alert-widget/weather-alert-widget';
import { GridstackItem } from './layout-components/gridstack-item/gridstack-item';
@Component({
	selector: 'app-dashboard',
	imports: [
		GridstackComponent,
		GridstackItem,
		MatButtonModule,
		MatIconModule,
		PegelWidget,
		WeatherWidget,
		WeatherAlertWidget,
	],
	templateUrl: './dashboard.html',
	styleUrls: ['./dashboard.scss'],
})
export class Dashboard {
	public readonly showSidePanel: WritableSignal<boolean> = signal(false);
	public readonly refreshBlocked: WritableSignal<boolean> = signal(false);
	public readonly dashboardService: DashboardService = inject(DashboardService);

	// Brittle Warning: Order Must correspond to order in Templates side-panel
	public readonly sidebarWidgets: NgGridStackWidget[] = [
		{ selector: 'app-pegel-widget', w: 5, h: 3 },
		{ selector: 'app-weather-widget', w: 2, h: 3 },
		{ selector: 'app-weather-alert-widget', w: 6, h: 4 },
	];

	private readonly widgetGridComponent: Signal<GridstackComponent> =
		viewChild.required<GridstackComponent>('widgetGrid');

	private readonly localStorageAccessor: LocalStorageAccessor<GridStackWidget[] & Serializable> =
		new LocalStorageAccessor<GridStackWidget[] & Serializable>('dashboardWidgetGrid');

	public gridOptions: NgGridStackOptions = {
		maxRow: 8,
		row: 8,
		cellHeight: 12.5,
		cellHeightUnit: '%',
		// margin: 5,
		acceptWidgets: true,
	};

	public ngAfterViewInit() {
		const widgetGridComponent = this.widgetGridComponent();
		if (!widgetGridComponent.grid) {
			throw new Error('widgetGridComponent.grid undefined');
		}
		this.dashboardService.setGrid(widgetGridComponent.grid);
		GridStack.setupDragIn(
			'.side-panel .grid-stack-item',
			{
				handle: '.grid-stack-drag-handle',
			},
			this.sidebarWidgets,
		);
		this.restoreGridLayout();
	}

	public onGridChange() {
		this.saveGridLayout();
	}

	public toggleSidePanel() {
		this.showSidePanel.set(!this.showSidePanel());
	}

	public refreshAll() {
		this.dashboardService.refreshAllTrigger$.next();
	}

	private saveGridLayout() {
		const widgetGridComponent = this.widgetGridComponent();
		if (!widgetGridComponent.grid) {
			throw new Error('widgetGridComponent.grid undefined');
		}
		// return type must be cast,
		// since no generic save is available,
		// the return type is actually GridStackWidget[] (same as NgGridStackOptions.children)
		// and serializable constrained is met, but cant be inferred
		// With more time a map() to a serializable type could solve this,
		// For now lets hope the dev of gridstack considered that this is put to local storage...
		const gridStackWidgets: GridStackWidget[] & Serializable =
			widgetGridComponent.grid.save() as GridStackWidget[] & Serializable;
		console.log('saving:', gridStackWidgets);
		this.localStorageAccessor.save(gridStackWidgets);
	}

	private restoreGridLayout() {
		const widgetGridComponent = this.widgetGridComponent();
		if (!widgetGridComponent.grid) {
			throw new Error('widgetGridComponent.grid undefined');
		}

		const localStorageGridStackWidgets = this.localStorageAccessor.load();

		if (localStorageGridStackWidgets !== undefined) {
			console.log('restoring:', localStorageGridStackWidgets);
			widgetGridComponent.grid.load(localStorageGridStackWidgets as GridStackWidget[]);
		}
	}
}

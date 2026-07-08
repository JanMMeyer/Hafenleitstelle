import { Component, inject, signal, Signal, viewChild, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LocalStorageAccessor } from '@cockpit/app/core/local-storage/local-storage-ascessor.class';
import { Serializable } from '@cockpit/app/core/types/Basic.type';
import { GridStackWidget } from 'gridstack';
import { GridstackComponent, NgGridStackOptions, NgGridStackWidget } from 'gridstack/dist/angular';
import { DashboardService } from './dashboard.service';
@Component({
	selector: 'app-dashboard',
	imports: [GridstackComponent, MatButtonModule, MatIconModule],
	template: `
		<button
			class="top-right show-hover-only fade-parent-hover"
			matMiniFab
			(click)="refreshAll()"
			[disabled]="refreshBlocked()"
		>
			<mat-icon>refresh</mat-icon>
		</button>
		<gridstack #widgetGrid [options]="gridOptions" (change)="onGridChange()"></gridstack>
	`,
	styles: `
		.grid-stack {
			background: plum;
		}
		:host {
			position: relative;
			height: 100%;
		}
	`,
})
export class Dashboard {
	// todo: make dashboard widget class that extends BaseWidget and inject dashboardService, registering and unregistering widgets
	public readonly refreshBlocked: WritableSignal<boolean> = signal(false);
	public readonly dashboardService: DashboardService = inject(DashboardService);

	private readonly defaultGridStackWidgets: NgGridStackWidget[] = [
		{ x: 0, y: 0, w: 3, h: 4, selector: 'app-weather-widget' },
		{ x: 3, y: 0, w: 7, h: 4, selector: 'app-pegel-widget' },
		{ x: 0, y: 4, w: 6, h: 4, selector: 'app-weather-alert-widget' },
	];

	private readonly widgetGridComponent: Signal<GridstackComponent> =
		viewChild.required<GridstackComponent>('widgetGrid');

	private readonly localStorageAccessor: LocalStorageAccessor<GridStackWidget[] & Serializable> =
		new LocalStorageAccessor<GridStackWidget[] & Serializable>('dashboardWidgetGrid');

	public gridOptions: NgGridStackOptions = {
		margin: 5,
	};

	public ngAfterViewInit() {
		this.restoreGridLayout();
	}

	public onGridChange() {
		this.saveGridLayout();
	}

	public refreshAll() {
		this.dashboardService.refreshAllTrigger$.next();
	}

	// Save layout to localStorage
	public saveGridLayout() {
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

	// Restore layout from localStorage
	private restoreGridLayout() {
		const widgetGridComponent = this.widgetGridComponent();
		if (!widgetGridComponent.grid) {
			throw new Error('widgetGridComponent.grid undefined');
		}

		const localStorageGridStackWidgets = this.localStorageAccessor.load();
		const gridStackWidgetsToLoad =
			Array.isArray(localStorageGridStackWidgets) && localStorageGridStackWidgets.length > 0
				? localStorageGridStackWidgets
				: this.defaultGridStackWidgets;
		console.log('restoring:', gridStackWidgetsToLoad);
		widgetGridComponent.grid.load(gridStackWidgetsToLoad as GridStackWidget[]);
	}
}

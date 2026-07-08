import { Component, inject, signal, Signal, viewChild, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LocalStorageAccessor } from '@cockpit/app/core/local-storage/local-storage-accessor.class';
import { Serializable } from '@cockpit/app/core/types/Basic.type';
import { GridStack, GridStackWidget } from 'gridstack';
import { GridstackComponent, NgGridStackOptions, NgGridStackWidget } from 'gridstack/dist/angular';
import { DashboardService } from './dashboard.service';
import { PegelWidget } from './pegel-widget/pegel-widget';
import { WeatherWidget } from './weather-widget/weather-widget';
import { WeatherAlertWidget } from './weather-alert-widget/weather-alert-widget';
@Component({
	selector: 'app-dashboard',
	imports: [
		GridstackComponent,
		MatButtonModule,
		MatIconModule,
		PegelWidget,
		WeatherWidget,
		WeatherAlertWidget,
	],
	template: `
		<div class="top-right show-hover-only fade-parent-hover button-container">
			<button class="" matMiniFab (click)="toggleSidePanel()">
				<mat-icon>settings</mat-icon>
			</button>
			<button class="" matMiniFab (click)="refreshAll()" [disabled]="refreshBlocked()">
				<mat-icon>refresh</mat-icon>
			</button>
		</div>

		<gridstack
			#widgetGrid
			[options]="gridOptions"
			(change)="onGridChange()"
			(removedCB)="onGridChange()"
		/>

		<aside class="side-panel" [class.hidden]="!showSidePanel()">
			<div class="grid-stack-item">
				<app-pegel-widget class="grid-stack-item-content" />
			</div>

			<div class="grid-stack-item">
				<app-weather-widget class="grid-stack-item-content" />
			</div>
			<div class="grid-stack-item">
				<app-weather-alert-widget class="grid-stack-item-content" />
			</div>
		</aside>
	`,
	styles: `
		:host {
			position: relative;
			display: flex;
			gap: 1rem;
			align-items: stretch;
			// display: grid;
			// grid-template-columns: 1fr min-content;
			// grid-template-areas: 'widget-grid side-panel';
			max-height: 100%;
			height: 100%;
			.grid-stack {
				flex-grow: 1;
				// grid-area: widget-grid;
				// display: block;
				// max-height: 100%;
				// height: 100%;
				background: plum;
			}
			.side-panel {
				// grid-area: side-panel;
				// position: absolute;
				// top: 30px;
				// right: 0;
				// z-index: 3;
				&.hidden {
					display: none;
					// width: 1px;
					// // flex-basis: 1px;
					// visibility: hidden;
				}
				display: flex;
				flex-direction: column;
				gap: 0.8rem;
				width: min-content;
				.grid-stack-item {
					// margin-bottom: -2rem; // naughty... explore better solution
				}
			}
		}
	`,
})
export class Dashboard {
	public readonly showSidePanel: WritableSignal<boolean> = signal(false);
	public readonly refreshBlocked: WritableSignal<boolean> = signal(false);
	public readonly dashboardService: DashboardService = inject(DashboardService);

	// Brittle Warning: Order Must correspond to order in Templates side-panel
	public readonly sidebarWidgets: NgGridStackWidget[] = [
		{ selector: 'app-pegel-widget', w: 7, h: 4 },
		{ selector: 'app-weather-widget', w: 3, h: 4 },
		{ selector: 'app-weather-alert-widget', w: 6, h: 4 },
	];

	private readonly widgetGridComponent: Signal<GridstackComponent> =
		viewChild.required<GridstackComponent>('widgetGrid');

	private readonly localStorageAccessor: LocalStorageAccessor<GridStackWidget[] & Serializable> =
		new LocalStorageAccessor<GridStackWidget[] & Serializable>('dashboardWidgetGrid');

	public gridOptions: NgGridStackOptions = {
		maxRow: 8,
		// margin: 5,
		acceptWidgets: true,
		removable: '.trash',
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
				handle: '.grid-stack-item-content',
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

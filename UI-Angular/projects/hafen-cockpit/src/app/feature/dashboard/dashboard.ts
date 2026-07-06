import { Component, Signal, signal, viewChild, ViewChild } from '@angular/core';
import { LocalStorageAccessor } from '@cockpit/app/core/local-storage/local-storage-ascessor.class';
import { Serializable } from '@cockpit/app/core/types/Basic.type';
import { GridStackOptions, GridStackWidget } from 'gridstack';
import { GridstackComponent, NgGridStackOptions, NgGridStackWidget } from 'gridstack/dist/angular';
@Component({
	selector: 'app-dashboard',
	imports: [GridstackComponent],
	template: `
		<gridstack #widgetGrid [options]="gridOptions" (change)="onGridChange()"></gridstack>
	`,
	styles: `
		.grid-stack {
			background: plum;
		}
		:host {
			height: 100%;
		}
	`,
})
export class Dashboard {
	private readonly defaultGridStackWidgets: NgGridStackWidget[] = [
		{ x: 0, y: 0, w: 3, h: 4, selector: 'app-weather-widget' },
		{ x: 3, y: 0, w: 3, h: 4, selector: 'app-pegel-widget' },
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

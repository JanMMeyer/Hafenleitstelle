import { Injectable } from '@angular/core';
import { WidgetControl } from '@cockpit/app/shared/widget/WidgetControl.type';
import { GridItemHTMLElement, GridStack } from 'gridstack';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DashboardService implements WidgetControl {
	private grid: GridStack | null = null;

	public readonly refreshAllTrigger$: Subject<void> = new Subject<void>();
	public readonly layoutChanged$: Subject<void> = new Subject<void>();

	public removeWidget(widget: GridItemHTMLElement): void {
		console.log('removeWidget', widget);
		if (!this.grid) {
			throw new Error('Grid not set');
		}
		this.grid.removeWidget(widget);
	}
	public setGrid(grid: GridStack): void {
		console.log('setGrid', grid);
		this.grid = grid;
		this.grid.on('change', () => {
			this.layoutChanged$.next();
		});
	}
}

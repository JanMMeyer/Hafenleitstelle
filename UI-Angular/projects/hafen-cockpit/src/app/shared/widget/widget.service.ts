import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { WidgetContainer } from './container/widget-container';

export type WidgetPosition = {
	row: number;
	col: number;
	rowSpan: number;
	colSpan: number;
};

@Injectable({
	providedIn: 'root',
})
export class WidgetService {
	// protected readonly widgets: Map<string, WidgetPosition> = new Map<string, WidgetPosition>();
	private colMap: Map<number, WidgetContainer> = new Map<number, WidgetContainer>();
	private rowMap: Map<number, WidgetContainer> = new Map<number, WidgetContainer>();

	private readonly _widgets: WritableSignal<Set<WidgetContainer>> = signal(
		new Set<WidgetContainer>(),
	);
	public readonly widgets: Signal<ReadonlySet<WidgetContainer>> = computed(() => this._widgets());

	public addWidget(widget: WidgetContainer): void {
		const colStart = widget.col();
		const colEnd = colStart + widget.colSpan();

		for (let i = colStart; i < colEnd; i++) {
			this.colMap.set(i, widget);
		}

		const rowStart = widget.row();
		const rowEnd = rowStart + widget.rowSpan();
		for (let i = rowStart; i < rowEnd; i++) {
			this.rowMap.set(i, widget);
		}
		this._widgets.update((widgets) => widgets.add(widget));
	}

	public removeWidget(widget: WidgetContainer): void {
		this._widgets.update((widgets) => {
			widgets.delete(widget);
			return widgets;
		});
	}
}

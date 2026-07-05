import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-widget-grid',
	imports: [],
	host: {
		class: 'debug',
	},
	templateUrl: './grid.html',
	changeDetection: ChangeDetectionStrategy.Eager,
	styleUrl: './grid.scss',
})
export class WidgetGrid {
	public readonly gridRow: string = 'foo';
}

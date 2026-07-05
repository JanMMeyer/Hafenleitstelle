import { Component, signal } from '@angular/core';
import { WidgetGrid } from '@cockpit/app/shared/widget/grid/grid';
import { WidgetContainer } from '@cockpit/app/shared/widget/container/container';
import { PegelWidget } from './pegel-widget/pegel-widget';

@Component({
	selector: 'app-dashboard',
	imports: [WidgetGrid, WidgetContainer, PegelWidget],
	template: `
		<app-widget-grid>
			<app-widget-container [row]="1" [col]="1">Widget 1</app-widget-container>
			<app-widget-container [row]="1" [col]="2">Widget 2</app-widget-container>
			<app-pegel-widget />
		</app-widget-grid>
	`,
	styles: `
		:host {
			height: 100%;
		}
	`,
})
export class Dashboard {
	protected readonly title = signal('Dashboard');
}

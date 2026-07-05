import { Component, signal } from '@angular/core';
import { WidgetGrid } from '@cockpit/app/shared/widget/grid/grid';
import { WidgetContainer } from '@cockpit/app/shared/widget/container/widget-container';
import { PegelWidget } from './pegel-widget/pegel-widget';
import { WeatherWidget } from './weather-widget/weather-widget';

@Component({
	selector: 'app-dashboard',
	imports: [WidgetGrid, WidgetContainer, PegelWidget, WeatherWidget],
	template: `
		<app-widget-grid>
			<app-weather-widget />
			<app-widget-container [row]="1" [col]="5" [rowSpan]="1" [colSpan]="2"
				>Widget 2</app-widget-container
			>
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

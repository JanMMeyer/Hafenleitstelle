import { Component, signal } from '@angular/core';
import { HttpErrorMockingControl } from '@cockpit/app/core/errorHandling/errorMocking/httpErrorMockingControl.component';
import { WidgetGrid } from './shared/widget/grid/grid';
import { WidgetContainer } from '@cockpit/shared/widget/cell/cell';
import { PegelWidget } from './feature/dashboard/pegel-widget/pegel-widget';
import { PegelWidgetApiService } from './feature/dashboard/pegel-widget/pegel-widget-api.service';

@Component({
	selector: 'app-root',
	imports: [WidgetGrid, WidgetContainer, HttpErrorMockingControl, PegelWidget],
	providers: [PegelWidgetApiService],
	host: {
		class: 'debug',
	},
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App {
	protected readonly title = signal('Hafen-Cockpit');
}

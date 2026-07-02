import { Component, signal } from '@angular/core';
import { HttpErrorMockingControl } from '@cockpit/app/core/errorHandling/errorMocking/httpErrorMockingControl.component';
import { WidgetGrid } from './shared/widget/grid/grid';
import { WidgetContainer } from '@cockpit/app/shared/widget/container/container';
import { PegelWidget } from './feature/dashboard/pegel-widget/pegel-widget';
import { PegelWidgetService } from './feature/dashboard/pegel-widget/pegel-widget.service';

@Component({
	selector: 'app-root',
	imports: [WidgetGrid, WidgetContainer, HttpErrorMockingControl, PegelWidget],
	providers: [PegelWidgetService],
	host: {
		class: 'debug',
	},
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App {
	protected readonly title = signal('Hafen-Cockpit');
}

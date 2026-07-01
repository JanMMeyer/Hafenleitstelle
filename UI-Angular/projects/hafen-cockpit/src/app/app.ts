import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WidgetGrid } from './shared/widget/grid/grid';
import { WidgetContainer } from '@cockpit/shared/widget/cell/cell';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, WidgetGrid, WidgetContainer],
	host: {
		class: 'debug',
	},
	templateUrl: './app.html',
	styleUrl: './app.scss',
})
export class App {
	protected readonly title = signal('Hafen-Cockpit');
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AsyncOutlet } from '@cockpit/app/core/async-outlet/async-outlet';
import { WidgetContainer } from '@cockpit/app/shared/widget/container/container';
import { PegelWidgetService } from './pegel-current.service';

@Component({
	selector: 'app-pegel-widget',
	imports: [WidgetContainer, MatProgressBarModule, AsyncOutlet],
	providers: [PegelWidgetService],
	template: `
		<app-widget-container [row]="2" [col]="1" [rowSpan]="1" [colSpan]="4">
			<ng-container *appAsyncOutlet="pegelService; let pegel = data">
				<span>{{ pegel.currentMeasurement.value }}</span>
				<span>{{ pegel.unit }}</span>
			</ng-container>

			<!-- <img
				src="https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/d488c5cc-4de9-4631-8ce1-0db0e700b546/W/measurements.png?start=P7D&width=440&height=220"
			/> -->
		</app-widget-container>
	`,
	changeDetection: ChangeDetectionStrategy.Eager,
	styles: `
		app-widget-container {
			width: 10rem;
			height: 10rem;
			display: block;
			// display: flex;
			// flex-direction: column;
		}
	`,
})
export class PegelWidget {
	public readonly pegelService: PegelWidgetService = inject(PegelWidgetService);
}

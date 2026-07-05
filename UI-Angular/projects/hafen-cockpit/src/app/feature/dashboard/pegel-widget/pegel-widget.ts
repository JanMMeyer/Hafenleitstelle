import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { AsyncOutlet } from '@cockpit/app/core/async-outlet/async-outlet';
import { WidgetContainer } from '@cockpit/app/shared/widget/container/widget-container';
import { PegelWidgetService } from './pegel-current.service';
import { PegelRelationPipe } from './pegel-relation.pipe';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-pegel-widget',
	imports: [
		WidgetContainer,
		AsyncOutlet,
		MatCardModule,
		MatListModule,
		PegelRelationPipe,
		DatePipe,
	],
	providers: [PegelWidgetService],
	template: `
		<app-widget-container [row]="2" [col]="1" [rowSpan]="3" [colSpan]="4">
			<mat-card>
				<mat-list *appAsyncOutlet="pegelService; let pegel = data">
					<mat-list-item>
						{{ pegel.currentMeasurement.timestamp | date: 'dd.MM.yy HH:mm' }}
					</mat-list-item>
					<mat-list-item>
						<span matListItemTitle>Wasserstand </span>
						<span matListItemLine
							>{{ pegel.currentMeasurement.value
							}}<span class="data-unit">{{ pegel.unit }}</span></span
						>
					</mat-list-item>
					<mat-list-item>
						<span matListItemTitle>Mnw/Mhw</span>
						<span>{{ pegel.currentMeasurement.stateMnwMhw | pegelRelation }}</span>
					</mat-list-item>
					<mat-list-item>
						<span matListItemTitle>Nsw/Hsw</span>
						<span>{{ pegel.currentMeasurement.stateNswHsw | pegelRelation }}</span>
					</mat-list-item>
				</mat-list>

				<!-- <img
				src="https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/d488c5cc-4de9-4631-8ce1-0db0e700b546/W/measurements.png?start=P7D&width=440&height=220"
			/> -->
			</mat-card>
		</app-widget-container>
	`,
	changeDetection: ChangeDetectionStrategy.Eager,
	styles: `
		:host {
			display: contents;
			app-widget-container {
				display: block;
				mat-card {
					padding: 0.5rem;
					height: 100%;
				}
			}
		}
	`,
})
export class PegelWidget {
	public readonly pegelService: PegelWidgetService = inject(PegelWidgetService);
}

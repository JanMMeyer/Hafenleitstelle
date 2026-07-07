import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AsyncOutlet } from '@cockpit/app/core/async-outlet/async-outlet';
import { getCappedRefreshBlockSignal } from '@cockpit/app/shared/capRefreshBlock.utils';
import { Widget } from '@cockpit/app/shared/widget/widget';
import { DashboardService } from '../dashboard.service';
import { PegelCurrentService } from './pegel-current.service';
import { PegelRelationPipe } from './pegel-relation.pipe';
import { PegelDataDto } from './PegelData.dto';
import { BaseChartDirective } from 'ng2-charts';
import { PegelHistoService } from './pegel-histo.service';

@Component({
	selector: 'app-pegel-widget',
	imports: [
		AsyncOutlet,
		MatCardModule,
		MatListModule,
		PegelRelationPipe,
		DatePipe,
		MatIconModule,
		MatButtonModule,
		BaseChartDirective,
	],
	providers: [PegelCurrentService, PegelHistoService],
	template: `
		<mat-card>
			<mat-card-content>
				<button
					class="top-right show-hover-only fade-parent-hover"
					matMiniFab
					(click)="refresh()"
					[disabled]="refreshBlocked()"
				>
					<mat-icon>refresh</mat-icon>
				</button>
				<mat-list *appAsyncOutlet="pegelCurrentService; showRefresh: false; let pegel = data">
					<mat-list-item>
						Stand&nbsp;{{ pegel.currentMeasurement.timestamp | date: 'dd.MM.yy HH:mm' }}
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
				<ng-container
					*appAsyncOutlet="pegelHistoService; showRefresh: false; let pegelHistoChartData = data"
				>
					<canvas baseChart [data]="pegelHistoChartData" [type]="'line'"> </canvas>
				</ng-container>
				<!-- <canvas baseChart [data]="barChartData" [options]="barChartOptions" [type]="'bar'">
				</canvas> -->
				<!-- <img
				src="https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/d488c5cc-4de9-4631-8ce1-0db0e700b546/W/measurements.png?start=P7D&width=440&height=220"
			/> -->
			</mat-card-content>
		</mat-card>
	`,
	styles: `
		mat-card {
			height: 100%;
			mat-card-content {
				position: relative;
				button.top-right {
					top: 1rem;
					right: 1rem;
				}
			}
		}
	`,
})
export class PegelWidget extends Widget {
	private readonly destroyRef = inject(DestroyRef);

	public readonly pegelCurrentService: PegelCurrentService = inject(PegelCurrentService);
	public readonly pegelHistoService: PegelHistoService = inject(PegelHistoService);
	public readonly widgetControlService: DashboardService = inject(DashboardService);

	public readonly pegelHistoGraphOptions: unknown = {
		parsing: {
			xAxisKey: 'label',
			yAxisKey: 'value',
		},
	};
	public readonly refreshBlocked: Signal<boolean> = getCappedRefreshBlockSignal({
		isLoading$: this.pegelCurrentService.isLoading$,
		destroyRef: this.destroyRef,
	});

	public refresh(): void {
		this.pegelCurrentService.load();
	}
}

import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AsyncOutlet } from '@cockpit/app/core/async-outlet/async-outlet';
import { getCappedRefreshBlockSignal } from '@cockpit/app/shared/capRefreshBlock.utils';
import { Widget } from '@cockpit/app/shared/widget/widget';
import { ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-adapter-date-fns';
import { DashboardService } from '../dashboard.service';
import { PegelCurrentService } from './pegel-current.service';
import { PegelChartService } from './pegel-chart.service';
import { PegelRelationPipe } from './pegel-relation.pipe';

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
	providers: [PegelCurrentService, PegelChartService],
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
					<canvas
						baseChart
						[data]="pegelHistoChartData"
						[type]="'line'"
						[options]="pegelHistoGraphOptions"
					>
					</canvas>
				</ng-container>
			</mat-card-content>
		</mat-card>
	`,
	styles: `
		mat-card {
			height: 100%;
			mat-card-content {
				display: flex;
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
	public readonly pegelHistoService: PegelChartService = inject(PegelChartService);
	public readonly widgetControlService: DashboardService = inject(DashboardService);

	public readonly pegelHistoGraphOptions: ChartOptions = {
		aspectRatio: 1.3,
		parsing: {
			// xAxisKey: 'timelabel',
			xAxisKey: 'timestamp',
			yAxisKey: 'value',
		},
		scales: {
			x: {
				type: 'time',
				time: {
					unit: 'hour',
					displayFormats: { hour: 'HH:mm' },
				},
				ticks: {},
			},
		},
		elements: {
			point: {
				radius: 0,
				hoverRadius: 4,
				hitRadius: 10,
			},
			line: {
				tension: 0.6,
				cubicInterpolationMode: 'monotone',
			},
		},
		plugins: {
			legend: {
				display: false,
			},
		},
	};
	public readonly refreshBlocked: Signal<boolean> = getCappedRefreshBlockSignal({
		isLoading$: this.pegelCurrentService.isLoading$,
		destroyRef: this.destroyRef,
	});

	public refresh(): void {
		this.pegelCurrentService.load();
		this.pegelHistoService.load();
	}
}

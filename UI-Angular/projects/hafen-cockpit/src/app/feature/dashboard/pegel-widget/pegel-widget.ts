import { DatePipe } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	inject,
	signal,
	WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AsyncOutlet } from '@cockpit/app/core/async-outlet/async-outlet';
import { capRefreshBlock } from '@cockpit/app/shared/capRefreshBlock.utils';
import { BaseWidget } from 'gridstack/dist/angular';
import { Subject } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { PegelWidgetService } from './pegel-current.service';
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
	],
	providers: [PegelWidgetService],
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
				<mat-list *appAsyncOutlet="pegelService; showRefresh: false; let pegel = data">
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
				<!-- <img
				src="https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/d488c5cc-4de9-4631-8ce1-0db0e700b546/W/measurements.png?start=P7D&width=440&height=220"
			/> -->
			</mat-card-content>
		</mat-card>
	`,
	changeDetection: ChangeDetectionStrategy.Eager,
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
export class PegelWidget extends BaseWidget {
	private readonly refreshTrigger$: Subject<void> = new Subject<void>();
	private readonly destroyRef = inject(DestroyRef);

	public readonly refreshBlocked: WritableSignal<boolean> = signal(false);
	public readonly pegelService: PegelWidgetService = inject(PegelWidgetService);
	public readonly dashboardService: DashboardService = inject(DashboardService);

	constructor() {
		super();

		capRefreshBlock({
			isLoading$: this.pegelService.isLoading$,
			refreshBlocked: this.refreshBlocked,
			destroyRef: this.destroyRef,
		});
	}

	public refresh(): void {
		this.pegelService.load();
	}
}

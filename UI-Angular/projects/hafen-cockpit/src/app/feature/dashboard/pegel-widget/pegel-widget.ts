import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AsyncOutlet } from '@cockpit/app/core/async-outlet/async-outlet';
import { WidgetContainer } from '@cockpit/app/shared/widget/container/container';
import { PegelWidgetService } from './pegel-current.service';
import { filter, Subject, switchMap, tap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HTTP_RETRY_CONFIG } from '@cockpit/app/core/errorHandling/errorRetry.interceptor';

@Component({
	selector: 'app-pegel-widget',
	imports: [WidgetContainer, MatProgressBarModule, AsyncOutlet],
	templateUrl: './pegel-widget.html',
	styleUrl: './pegel-widget.scss',
})
export class PegelWidget implements OnInit, OnDestroy {

	private readonly refreshBockTrigger$: Subject<void> = new Subject<void>();

	public readonly pegelService: PegelWidgetService = inject(PegelWidgetService);
	public readonly refreshBlocked: WritableSignal<boolean> = signal(false);


	constructor() {
		this.refreshBockTrigger$.pipe(
			filter(() => !this.refreshBlocked()),
			tap(() => this.refreshBlocked.set(true)),
			switchMap(() => timer(Math.floor(HTTP_RETRY_CONFIG.maxRetryDurationInMs / 3))),
			takeUntilDestroyed()
		).subscribe(() => {
			this.refreshBlocked.set(false);
		});
	}

	public onRefreshClick(): void {
		if (this.refreshBlocked()) return;
		this.refreshBockTrigger$.next();
		this.pegelService.fetchData();
	}

	public ngOnInit(): void {
		// Only fetch data once on init
		this.pegelService.fetchData();
	}

	public ngOnDestroy(): void {
		this.pegelService.destroy();
		this.refreshBockTrigger$.complete()
	}
}

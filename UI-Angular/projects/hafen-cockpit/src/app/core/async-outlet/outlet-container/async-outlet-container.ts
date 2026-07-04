import { NgTemplateOutlet } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	input,
	InputSignal,
	OnDestroy,
	OnInit,
	Signal,
	signal,
	TemplateRef,
	WritableSignal
} from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { filter, Subject, switchMap, tap, timer } from 'rxjs';
import { HttpError } from '../../errorHandling/httpError.class';
import { implyNever } from '../../fundamentals/implyNever';
import { AsyncDataService } from '../../types/BusyDataSource.type';
import { SwitchExhaustibleAsyncDataWrapper } from '../../types/SwitchExhaustibleAsyncDataWrapper.type';
import { WithError } from '../../types/WithError.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HTTP_RETRY_CONFIG } from '../../errorHandling/errorRetry.interceptor';

@Component({
	selector: 'app-async-outlet-data',
	imports: [MatProgressBarModule, NgTemplateOutlet],
	templateUrl: './async-outlet-container.html',
	styles: `
		:host {
			display: flex;
			flex-direction: column;
		}
	`,
})
export class AsyncOutletContainer<TData extends object> implements OnInit, OnDestroy {
	private readonly refreshTrigger$: Subject<void> = new Subject<void>();

	public readonly asyncDataService: InputSignal<AsyncDataService<TData>> = input.required();
	public readonly contentTemplate: InputSignal<TemplateRef<{ data: TData }>> = input.required();

	// public readonly mode: WritableSignal<'loading' | 'error' | 'data'> = signal<'loading' | 'error' | 'data'>('loading');
	public readonly wrappedSwitchData: Signal<SwitchExhaustibleAsyncDataWrapper<TData, HttpError>> =
		computed<SwitchExhaustibleAsyncDataWrapper<TData, HttpError>>(() => {
			const value: WithError<TData, HttpError> | undefined = this.asyncDataService().data();
			if (!value) {
				return { value: undefined, type: 'undefined' };
			} else if (value instanceof HttpError) {
				return { value: value, type: 'error' };
			} else if (value instanceof Object) {
				return { value: value, type: 'data' };
			} else {
				return implyNever(value);
			}
		});

	public readonly refreshBlocked: WritableSignal<boolean> = signal(false);

	constructor() {
		this.refreshTrigger$.pipe(
			filter(() => !this.refreshBlocked()),
			tap(() => {
				this.refreshBlocked.set(true)
				this.asyncDataService().fetchData();
			}),
			switchMap(() => timer(Math.floor(HTTP_RETRY_CONFIG.maxRetryDurationInMs / 3))),
			takeUntilDestroyed(),
		).subscribe(() => {
			this.refreshBlocked.set(false);
		});
	}

	public ngOnInit(): void {
		this.asyncDataService().fetchData();
	}

	public refresh(): void {
		this.refreshTrigger$.next();
	}

	public ngOnDestroy(): void {
		this.refreshTrigger$.complete();
	}
}

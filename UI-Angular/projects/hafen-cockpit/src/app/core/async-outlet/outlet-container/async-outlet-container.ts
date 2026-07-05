import { NgTemplateOutlet } from '@angular/common';
import {
	Component,
	computed,
	input,
	InputSignal,
	OnDestroy,
	OnInit,
	Signal,
	signal,
	TemplateRef,
	WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { filter, Subject, switchMap, tap, timer } from 'rxjs';
import { HTTP_RETRY_CONFIG } from '../../errorHandling/errorRetry.interceptor';
import { HttpError } from '../../errorHandling/httpError.class';
import { implyNever } from '../../fundamentals/implyNever';
import { AsyncDataSource } from '../../types/AsyncDataSource.type';
import { SwitchExhaustibleAsyncDataWrapper } from '../../types/SwitchExhaustibleAsyncDataWrapper.type';
import { WithError } from '../../types/WithError.type';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
	selector: 'app-async-outlet-data',
	imports: [
		MatProgressBarModule,
		MatButtonModule,
		MatIconModule,
		MatProgressSpinnerModule,
		NgTemplateOutlet,
	],
	templateUrl: './async-outlet-container.html',
	styles: `
		:host {
			position: relative;
			display: block;
			height: 100%;

			.progress-bar-container {
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				box-sizing: border-box;
				padding: 2px;
			}
			mat-progress-bar {
				border-radius: 2px;
				z-index: 2;
			}

			.refresh-button {
				position: absolute;
				opacity: 0;
				top: 0;
				right: 0rem;
				z-index: 2;
				&:hover {
					opacity: 1;
				}
			}
			&:hover .refresh-button:not(:hover) {
				opacity: 0.5;
			}
		}
	`,
})
export class AsyncOutletContainer<TData extends object> implements OnInit, OnDestroy {
	private readonly refreshTrigger$: Subject<void> = new Subject<void>();

	public readonly asyncDataService: InputSignal<AsyncDataSource<TData>> = input.required();
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
		this.refreshTrigger$
			.pipe(
				filter(() => !this.refreshBlocked()),
				tap(() => {
					this.refreshBlocked.set(true);
					this.asyncDataService().load();
				}),
				switchMap(() => timer(Math.floor(HTTP_RETRY_CONFIG.maxRetryDurationInMs / 3))),
				takeUntilDestroyed(),
			)
			.subscribe(() => {
				this.refreshBlocked.set(false);
			});
	}

	public ngOnInit(): void {
		this.asyncDataService().load();
	}

	public refresh(): void {
		this.refreshTrigger$.next();
	}

	public ngOnDestroy(): void {
		this.refreshTrigger$.complete();
	}
}

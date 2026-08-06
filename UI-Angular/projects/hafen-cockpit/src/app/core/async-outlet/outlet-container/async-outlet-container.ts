import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
	Component,
	computed,
	DestroyRef,
	inject,
	input,
	InputSignal,
	OnInit,
	Signal,
	signal,
	TemplateRef,
	WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { capRefreshBlock } from '@cockpit/app/shared/capRefreshBlock.utils';
import { HttpError } from '../../errorHandling/httpError.class';
import { implyNever } from '../../fundamentals/implyNever';
import { AsyncDataSource } from '../../types/AsyncDataSource.type';
import { SwitchExhaustibleAsyncDataWrapper } from '../../types/SwitchExhaustibleAsyncDataWrapper.type';
import { WithError } from '../../types/WithError.type';

// Explicit state modeling: SwitchExhaustibleAsyncDataWrapper
// + switch in AsyncOutletContainer makes async UI states very readable
@Component({
	selector: 'app-async-outlet-data',
	imports: [
		MatProgressBarModule,
		MatButtonModule,
		MatIconModule,
		MatProgressSpinnerModule,
		NgTemplateOutlet,
		AsyncPipe,
	],
	templateUrl: './async-outlet-container.html',
	styles: `
		:host {
			position: relative;
			display: block;
			height: 100%;

			.progress-bar-container {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				box-sizing: border-box;
				padding: 0 55px 0 5px;

				mat-progress-bar {
					border-radius: 2px;
					z-index: 2;
				}
			}
		}
	`,
})
export class AsyncOutletContainer<TData extends object> implements OnInit {
	private readonly destroyRef = inject(DestroyRef);

	public readonly asyncDataService: InputSignal<AsyncDataSource<TData>> = input.required();
	public readonly contentTemplate: InputSignal<TemplateRef<{ data: TData }>> = input.required();
	public readonly showRefresh: InputSignal<boolean> = input(true);
	public readonly refreshBlocked: WritableSignal<boolean> = signal(false);

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

	public ngOnInit(): void {
		// less elegant version of getCappedRefreshBlockSignal, but since asyncDataService is a signal
		// and is not set until "ngOnInit" we can't use it here
		// better pattern to use DI to inject asyncDataService, and let parent component provide correct service?
		capRefreshBlock({
			isLoading$: this.asyncDataService().isLoading$,
			refreshBlocked: this.refreshBlocked,
			destroyRef: this.destroyRef,
		});

		this.asyncDataService().load();
	}

	public refresh(): void {
		this.asyncDataService().load();
	}
}

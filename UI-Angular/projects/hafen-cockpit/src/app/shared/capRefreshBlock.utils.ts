import { DestroyRef, WritableSignal } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { filter, timer } from 'rxjs';
import { HTTP_RETRY_CONFIG } from '../core/errorHandling/errorRetry.interceptor';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type BlockRefreshUntilParams = {
	isLoading$: Observable<boolean>;
	refreshBlocked: WritableSignal<boolean>;
	destroyRef: DestroyRef;
	delayInMs?: number;
};
export function capRefreshBlock({
	isLoading$,
	refreshBlocked,
	destroyRef,
	delayInMs = Math.floor(HTTP_RETRY_CONFIG.maxRetryDurationInMs / 3),
}: BlockRefreshUntilParams): void {
	isLoading$
		.pipe(
			tap((isLoading) => {
				refreshBlocked.set(isLoading);
			}),
			filter((isLoading) => isLoading),
			switchMap(() => timer(delayInMs)),
			takeUntilDestroyed(destroyRef),
		)
		.subscribe(() => {
			refreshBlocked.set(false);
		});
}

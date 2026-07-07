import { DestroyRef, Signal, WritableSignal } from '@angular/core';
import { concat, map, Observable, of, switchMap, tap } from 'rxjs';
import { filter, timer } from 'rxjs';
import { HTTP_RETRY_CONFIG } from '../core/errorHandling/errorRetry.interceptor';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

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

export type GetCappedRefreshBlockParams = {
	isLoading$: Observable<boolean>;
	destroyRef: DestroyRef;
	delayInMs?: number;
};
// mirrors is loading, buts resets to false after delay
export function getCappedRefreshBlockSignal({
	isLoading$,
	destroyRef,
	delayInMs = Math.floor(HTTP_RETRY_CONFIG.maxRetryDurationInMs / 3),
}: GetCappedRefreshBlockParams): Signal<boolean> {
	const refreshBlocked$ = isLoading$.pipe(
		switchMap((isLoading) =>
			// if isLoading: concat sends true immediately, then false after delay. if is not loading: send false immediately
			isLoading ? concat(of(true), timer(delayInMs).pipe(map(() => false))) : of(false),
		),
		takeUntilDestroyed(destroyRef),
	);
	return toSignal(refreshBlocked$, { initialValue: false });
}

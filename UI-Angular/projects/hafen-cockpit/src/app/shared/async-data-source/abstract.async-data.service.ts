import { HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ErrorLoggingService } from '@cockpit/app/core/errorHandling/errorLogging.service';
import { HttpError } from '@cockpit/app/core/errorHandling/httpError.class';
import { AsyncDataSource } from '@cockpit/app/core/types/AsyncDataSource.type';
import { WithError } from '@cockpit/app/core/types/WithError.type';
import { BehaviorSubject, catchError, Observable, of, Subject, switchMap, take, tap } from 'rxjs';

@Injectable()
export abstract class AsyncDataSourceService<
	TData extends object,
> implements AsyncDataSource<TData> {
	private readonly errorLoggingService: ErrorLoggingService = inject(ErrorLoggingService);
	private readonly destroyRef = inject(DestroyRef);

	private readonly loadTrigger$: Subject<void> = new Subject<void>();

	private readonly _isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	private readonly _data: WritableSignal<WithError<TData, HttpError> | undefined> =
		signal(undefined);

	// Bei komplexeren apps mit ngrx-artigem state management
	// sollte man dieses nutzen umd ein generisches request tracking via UUID zu implementieren,
	// um nicht für jeden call ein eigenen signal tracken zu müssen.
	// Anwendung: wenn z.B. buttons in einer parent component inaktiv sein müssen solange ein child busy ist.
	public readonly isLoading$: Observable<boolean> = this._isLoading.asObservable();
	// Der "WithError" return type dient dazu die lokale handling von http errors zu "erzwingen"
	public readonly data: Signal<WithError<TData, HttpError> | undefined> = this._data.asReadonly();

	// Resource option verworfen, da noch sehr bleeding edge, handhabung unklar.
	// private readonly data = rxResource<WithError<TData, HttpError>, undefined>...);

	constructor() {
		this.loadTrigger$
			.pipe(
				tap(() => this._isLoading.next(true)),
				switchMap(() =>
					this.fetchData().pipe(
						catchError((error: unknown) => {
							if (error instanceof HttpErrorResponse) {
								return of(new HttpError(error.error, error.status));
							}
							const errorToLog = new Error('FetchData threw non HttpErrorResponse', {
								cause: error,
							});
							this.errorLoggingService.logError(errorToLog);
							return of(new HttpError(errorToLog, 400));
						}),
						take(1),
					),
				),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((data: WithError<TData, HttpError>) => {
				this._isLoading.next(false);
				this._data.set(data);
			});
	}

	/**
	 * Loads the data with the fetchData method
	 * and forwards the FIRST emission to the data signal.
	 * Caught errors are forwarded to the data signal as well.
	 * Until first emission  or error, the isLoading signal is true.
	 */
	public load(): void {
		this.loadTrigger$.next();
	}

	protected abstract fetchData(): Observable<TData>;
}

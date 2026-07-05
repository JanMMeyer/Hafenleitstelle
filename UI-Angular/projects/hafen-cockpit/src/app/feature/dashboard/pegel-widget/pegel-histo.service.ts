import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { ErrorLoggingService } from '@cockpit/app/core/errorHandling/errorLogging.service';
import { HttpError } from '@cockpit/app/core/errorHandling/httpError.class';
import { WithError } from '@cockpit/app/core/types/WithError.type';
import { catchError, finalize, Observable, of, Subscription } from 'rxjs';
import { PegelDataDto } from './PegelData.dto';
import { AsyncDataSource } from '@cockpit/app/core/types/AsyncDataSource.type';

//  TODO location as injectable token
// 'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/${location}/W/measurements.png?start=P7D&width=440&height=220';
@Injectable()
export class PegelWidgetService {
	private readonly baseApiUrl: string =
		'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/';
	private readonly locationUUID: string = 'd488c5cc-4de9-4631-8ce1-0db0e700b546';

	private readonly pegelCurrentUrl =
		this.baseApiUrl + this.locationUUID + '/W.json?includeCurrentMeasurement=true';
	private readonly pegelHistoryPngUrl =
		this.baseApiUrl + this.locationUUID + '/W/measurements.png?start=P7D&width=440&height=220';

	private readonly http: HttpClient = inject(HttpClient);
	// private readonly errorTracingService: ErrorTracingService = inject(ErrorTracingService);
	private readonly errorTracingService: ErrorLoggingService = new ErrorLoggingService();

	// Hier könnte man auch ein protected Subscrion-Set in der base service class erwägen. Vorteil: nur eine property die batch unsubscibe erlaubt.
	private pegelHistoryPngSubscription?: Subscription;

	// Bei komplexeren apps mit ngrx-artigem state management
	// sollte man dieses nutzen umd ein generisches request tracking via UUID zu implementieren,
	// um nicht für jeden call ein eigenen signal tracken zu müssen.
	// Anwendung: wenn z.B. buttons in einer parent component inaktiv sein müssen solange ein child busy ist.
	private readonly _isPegelHistoryPngLoading: WritableSignal<boolean> = signal(false);

	// Resouce option verworfen, da noch sehr bleeding edge, handhabung unklar.
	// private readonly pegelCurrent = rxResource<WithError<PegelDataDto, HttpError>, undefined>...);
	private readonly _pegelHistoryPng: WritableSignal<WithError<unknown, HttpError>> = signal(null);

	// Der "WithError" return type dient dazu die lokale handling von http errors zu "erzwingen"
	// Dies sollte in einer base service class angelegt werden, oder noch besser in eine httpClient wrapper (siehe App Config).
	public readonly data: Signal<WithError<unknown, HttpError> | undefined> =
		this._pegelHistoryPng.asReadonly();
	// public readonly isBusyLoading: Signal<boolean> = computed(() => this._isPegelCurrentLoading() || this._isPegelHistoryPngLoading());
	public readonly isLoading: Signal<boolean> = this._isPegelHistoryPngLoading.asReadonly();

	public load(): void {
		this.cancelFetchDataRequests();

		this.pegelHistoryPngSubscription = this.fetchPegelHistoryPng().subscribe((pegelHistoryPng) =>
			this._pegelHistoryPng.set(pegelHistoryPng),
		);
	}

	public destroy(): void {
		this.cancelFetchDataRequests();
	}

	protected cancelFetchDataRequests(): void {
		this.pegelHistoryPngSubscription?.unsubscribe();
		this._isPegelHistoryPngLoading.set(false);
	}

	private fetchPegelHistoryPng(): Observable<WithError<unknown, HttpError>> {
		this._isPegelHistoryPngLoading.set(true);
		return this.http.get(this.pegelHistoryPngUrl).pipe(
			// TODO: error catch protected in base service class.
			catchError((error: unknown) => {
				if (!(error instanceof HttpErrorResponse))
					throw new Error('Unexpected argument type in catchError', { cause: error });
				return of(new HttpError(error.error, error.status));
			}),
			finalize(() => this._isPegelHistoryPngLoading.set(false)),
		);
	}
}

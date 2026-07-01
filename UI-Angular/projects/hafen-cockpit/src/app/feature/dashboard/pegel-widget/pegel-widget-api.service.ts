import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HttpError } from '@cockpit/app/core/errorHandling/httpError.class';
import { WithError } from '@cockpit/app/core/errorHandling/WithError.type';
import { catchError, Observable, of } from 'rxjs';

//TODO location as injectable token
// 'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/${location}/W/measurements.png?start=P7D&width=440&height=220';
@Injectable()
export class PegelWidgetApiService {
	private readonly baseApiUrl: string =
		'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/';
	private readonly locationUUID: string = 'd488c5cc-4de9-4631-8ce1-0db0e700b546';

	private readonly pegelCurrentUrl =
		this.baseApiUrl + this.locationUUID + 'W.json?includeCurrentMeasurement=true';
	private readonly pegelHistoryPngUrl =
		this.baseApiUrl + this.locationUUID + 'W/measurements.png?start=P7D&width=440&height=220';

	private readonly http: HttpClient = inject(HttpClient);

	public getPegelCurrent(): Observable<WithError<any, HttpError>> {
		return this.http.get(this.pegelCurrentUrl).pipe(
			catchError((error: unknown) => {
				if (error instanceof HttpErrorResponse) {
					return of(new HttpError(error.error, error.status));
				}
				throw new Error('Unknown Http Error', { cause: error });
			}),
		);
	}

	public getPegelHistoryPng(): Observable<WithError<any, HttpError>> {
		return this.http.get(this.pegelHistoryPngUrl).pipe(
			catchError((error: unknown) => {
				if (error instanceof HttpErrorResponse) {
					return of(new HttpError(error.error, error.status));
				}
				throw new Error('Unknown Http Error', { cause: error });
			}),
		);
	}


}

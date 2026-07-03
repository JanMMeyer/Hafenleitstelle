import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { delay, map, Observable, of, switchMap, throwError } from 'rxjs';
import { ErrorMockingService } from './errorMocking.service';
import { inject } from '@angular/core';
import { HttpError } from '../httpError.class';

export function httpErrorMockingInterceptor(
	request: HttpRequest<unknown>,
	handleHttp: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
	const errorMockingService: ErrorMockingService = inject(ErrorMockingService);
	return handleHttp(request).pipe(
		delay(errorMockingService.httpLatency()),
		switchMap((event: HttpEvent<unknown>) => {
			if (event.type === HttpEventType.Response && errorMockingService.shouldThrow) {
				return throwError(() =>  new HttpErrorResponse( {
					error: new Error('Some Backend Oopsie Woopsie'),
					status: 500,
					statusText: 'Internal Server Error',
					url: request.url,
				}))
			}
			return of(event);
		})

	);
}

import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { delay, Observable, of, switchMap, throwError } from 'rxjs';
import { ErrorMockingService } from './errorMocking.service';
import { inject } from '@angular/core';

const mockStatusText: Record<500 | 408, string> = {
	500: 'Internal Server Error',
	408: 'Request Timeout',
};

export function httpErrorMockingInterceptor(
	request: HttpRequest<unknown>,
	handleHttp: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
	const errorMockingService: ErrorMockingService = inject(ErrorMockingService);
	return handleHttp(request).pipe(
		delay(errorMockingService.httpLatency()),
		switchMap((event: HttpEvent<unknown>) => {
			if (event.type === HttpEventType.Response && errorMockingService.shouldThrow) {
				const status = errorMockingService.httpErrorStatus();
				return throwError(() => new HttpErrorResponse({
					error: new Error('Some Backend Oopsie Woopsie'),
					status,
					statusText: mockStatusText[status],
					url: request.url,
				}));
			}
			return of(event);
		})

	);
}

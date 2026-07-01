import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ErrorMockingService } from './ErrorMocking.service';
import { inject } from '@angular/core';
import { HttpError } from '../HttpError.class';

export function httpErrorMockingInterceptor(
	request: HttpRequest<unknown>,
	handleHttp: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
	const errorMockingService = inject(ErrorMockingService);
	return handleHttp(request).pipe(
		map((event: HttpEvent<unknown>) => {
			if (event.type === HttpEventType.Response && errorMockingService.shouldThrow) {
				throw new HttpError(new Error('Some Backend Oopsie Woopsie'), 404);
			}
			return event;
		}),
	);
}

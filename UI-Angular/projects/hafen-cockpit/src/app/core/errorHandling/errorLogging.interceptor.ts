import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { ErrorLoggingService, SKIP_LOGGING_INTERCEPTOR } from "./errorLogging.service";

// @Injectable({
// 	providedIn: 'root'
// })
// export class httpErrorLoggingInterceptor implements HttpInterceptor {
// 	private readonly errorLoggingService: ErrorLoggingService = inject(ErrorLoggingService);
// 	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
// 		return next.handle(request).pipe(
// 			catchError((error: unknown, caught: Observable<HttpEvent<unknown>>) => {
// 				if (error instanceof HttpErrorResponse) {
// 					this.errorLoggingService.logError(error);
// 					return caught;
// 				}
// 				throw new TypeError('Unexpected argument type in ErrorLogging Interceptor', { cause: error });
// 			}),
// 		);
// 	}
// }

export function httpErrorLoggingInterceptor(
	request: HttpRequest<unknown>,
	handleHttp: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
	const errorLoggingService: ErrorLoggingService = inject(ErrorLoggingService);
	return handleHttp(request).pipe(
		catchError((error: unknown, caught: Observable<HttpEvent<unknown>>) => {
			if (error instanceof HttpErrorResponse) {
				if (!request.context.get(SKIP_LOGGING_INTERCEPTOR)) { errorLoggingService.logError(error); }
				throw error;
			}
			throw new TypeError('Unexpected argument type in ErrorLogging Interceptor', { cause: error });
		}),
	);
}
import { HttpClient, HttpContext, HttpContextToken, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ErrorLoggingError } from './httpError.class';

// consider to  use injection token
const ERROR_LOGGING_CONFIG = { errorLoggingUrl: 'https://error.logging.url' };

export const SKIP_LOGGING_INTERCEPTOR = new HttpContextToken<boolean>(() => false);
const ERROR_LOGGING_CONTEXT: HttpContext = new HttpContext().set(SKIP_LOGGING_INTERCEPTOR, true);

@Injectable({
	providedIn: 'root',
})
export class ErrorLoggingService {
	private readonly http: HttpClient = inject(HttpClient);
	// Mocked endpoint, will fail
	public logError(errorToLog: Error): void {
		if (errorToLog instanceof ErrorLoggingError) return;

		this.http
			.post(
				ERROR_LOGGING_CONFIG.errorLoggingUrl,
				{ error: errorToLog },
				{ context: ERROR_LOGGING_CONTEXT },
			)
			.subscribe({
				next: () => {
					console.log('Error occurred and was logged:', errorToLog);
				},
				error: (errorFromLogger: unknown) => {
					if (!(errorFromLogger instanceof HttpErrorResponse)) {
						throw new TypeError('Unexpected argument type in error logging', {
							cause: errorFromLogger,
						});
					}
					// fail silently, no further handling possible, app still works and user cant do anything about it.
					console.error('Failed to log the following error:', errorToLog);
					console.error('Cause for that failure :', errorFromLogger);
				},
			});
	}
}

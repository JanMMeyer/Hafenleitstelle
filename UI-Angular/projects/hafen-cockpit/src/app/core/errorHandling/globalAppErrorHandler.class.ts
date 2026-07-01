import { ErrorHandler, inject } from '@angular/core';
import { ErrorTracingService } from './errorTracing.service';

export class GlobalAppErrorHandler implements ErrorHandler {
	private readonly errorTracingService: ErrorTracingService = inject(ErrorTracingService);

	public handleError(mostLikelyAnError: unknown): void {
		// error is "any" in Angulars ErrorHandler interface... graceful cast to unknown
		let errorToHandle: Error;
		if (!(mostLikelyAnError instanceof Error)) {
			errorToHandle = new TypeError(
				`Argument is not "instance of Error". Received type: ${typeof mostLikelyAnError}`,
			);
		} else {
			errorToHandle = mostLikelyAnError;
		}

		this.errorTracingService.logError(errorToHandle);
		// TODO: nicer popover, with reload button
		alert('An error occurred. Please reload the page.');
	}
}

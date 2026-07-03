import { ErrorHandler, inject } from '@angular/core';
import { ErrorLoggingService } from './errorLogging.service';
import { ErrorLoggingError } from './httpError.class';

export class GlobalAppErrorHandler implements ErrorHandler {
	private readonly errorLoggingService: ErrorLoggingService = inject(ErrorLoggingService);

	public handleError(mostLikelyAnError: unknown): void {

		const errorToHandle: Error = mostLikelyAnError instanceof Error? mostLikelyAnError
			: new TypeError(`Argument is not "instance of Error". Received type: ${typeof mostLikelyAnError}`)

		try {
			this.errorLoggingService.logError(errorToHandle)
		} catch (error) {
			console.error('ErrorLoggingService threw ', error); // no idea how to handle this properly... email support?
		}

		// App still works and user cant do anything about it -> no notification needed
		if (errorToHandle instanceof ErrorLoggingError) return;

		// TODO: nicer popover, with reload button
		alert('An error occurred. Please reload the page.');



	}
}

// Custom Error Classes allow for type-safe error handling via "instanceof"

// HTTP errors are handled locally in the requesting component, prompting user to retry or contact support. rest of app still works.
// All Other (App runtime) errors are handled globally, prompting user to reload page, since state is mosts likely corrupted.
export class HttpError extends Error {
	public override readonly name: string = 'HttpError';
	constructor(
		rootError: Error,
		public readonly statusCode: number,
	) {
		super(rootError.message, { cause: rootError });
	}
}

// Only thrown by error logging endpoint, must be distinguished from other HttpErrors to avoid infinite loop of trying to log an logging error.
export class ErrorLoggingError extends AggregateError {
	public override readonly name: string = 'ErrorLoggingError';
	constructor({ errorToLog, errorFromLogger }: { errorToLog: Error, errorFromLogger: Error}) {
		super([errorFromLogger, errorToLog], errorFromLogger.message);
	}
}[]
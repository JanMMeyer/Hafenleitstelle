// enables typesafe  error handling via "instanceof"

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

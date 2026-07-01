import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, first, of, take } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ErrorTracingService {
	private readonly http: HttpClient = inject(HttpClient);
	private readonly logUrl: string = 'https://foo.bar';

	public logError(error: Error): void {
		this.http
			.post(this.logUrl, { error: error })
			.pipe(
				catchError((httpError) => {
					console.error('Failed to log the following error:', error);
					console.error('Cause for that failure :', httpError);
					return of(null);
				}),
				take(1),
			)
			.subscribe();
	}
}

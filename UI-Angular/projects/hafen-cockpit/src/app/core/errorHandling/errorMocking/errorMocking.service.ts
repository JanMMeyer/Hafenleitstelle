import { Injectable, signal, WritableSignal } from '@angular/core';

export type MockHttpErrorStatus = 500 | 408;

@Injectable({
	providedIn: 'root',
})
export class ErrorMockingService {
	public readonly httpErrorPeriod: WritableSignal<number> = signal(0);
	public readonly httpLatency: WritableSignal<number> = signal(0);
	public readonly httpErrorStatus: WritableSignal<MockHttpErrorStatus> = signal(500);
	private callCounter: number = 0;

	/**
	 * Sets the period for HTTP errors.
	 * A period of 1 means each call throws an error, 2 means once every 2 calls, etc.
	 * Period of 0 means no errors are thrown.
	 * Period will be rounded to the nearest integer.
	 * @param period - The period for HTTP errors.
	 * @returns void
	 */
	public setHttpErrorPeriod(period: number): void {
		this.httpErrorPeriod.set(Math.round(Math.min(Math.max(0, period), 100)));
		this.callCounter = 0;
	}

	public resetCallCounter(): void {
		this.callCounter = 0;
	}

	public get shouldThrow(): boolean {
		const period = this.httpErrorPeriod();
		if (period === 0) {
			return false;
		}
		this.callCounter++;
		return this.callCounter % period === 0;
	}
}

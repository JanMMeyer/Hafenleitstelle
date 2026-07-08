import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ErrorMockingService, MockHttpErrorStatus } from './errorMocking.service';
// AI generated... manually modified
@Component({
	selector: 'app-http-error-period-control',
	host: {
		'[style.display]': 'visible() ? "flex" : "none"',
	},
	template: `
		@if (visible()) {
			<fieldset>
				<legend>HTTP error type</legend>

				<label>
					<input
						type="radio"
						name="httpErrorStatus"
						[checked]="errorMocking.httpErrorStatus() === 408"
						(change)="onErrorStatusChange(408)"
					/>
					408
				</label>
				<label>
					<input
						type="radio"
						name="httpErrorStatus"
						[checked]="errorMocking.httpErrorStatus() === 500"
						(change)="onErrorStatusChange(500)"
					/>
					500
				</label>
			</fieldset>
			<label for="httpErrorPeriod">HTTP error period: {{ errorMocking.httpErrorPeriod() }}</label>
			<input
				name="httpErrorPeriod"
				type="range"
				min="0"
				max="5"
				step="1"
				[value]="errorMocking.httpErrorPeriod()"
				(input)="onPeriodChange($event)"
			/>
			<label for="httpLatency">HTTP latency: {{ errorMocking.httpLatency() }}</label>
			<input
				name="httpLatency"
				type="range"
				min="0"
				max="3000"
				step="200"
				[value]="errorMocking.httpLatency()"
				(input)="onLatencyChange($event)"
			/>

			<button type="button" (click)="onThrowRuntimeError()">Throw App Error</button>
		}
	`,
	styles: `
		:host {
			position: fixed;
			bottom: 0.5rem;
			left: 0.5rem;
			z-index: 1000;

			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			padding: 0.5rem;
			background-color: hotpink;
			border-radius: 0.5rem;
		}

		input[type='range'] {
			width: 10rem;
		}

		fieldset {
			border: none;
			margin: 0;
			padding: 0;
			display: flex;
			gap: 0.75rem;
		}
	`,
})
export class HttpErrorMockingControl {
	protected readonly errorMocking = inject(ErrorMockingService);
	protected readonly visible = signal(false);
	private readonly destroyRef = inject(DestroyRef);

	constructor() {
		const onKeydown = (event: KeyboardEvent) => {
			if (event.ctrlKey && event.altKey && event.key.toLowerCase() === 'd') {
				event.preventDefault();
				this.visible.update((v) => !v);
			}
		};

		window.addEventListener('keydown', onKeydown);
		this.destroyRef.onDestroy(() => window.removeEventListener('keydown', onKeydown));
	}

	protected onPeriodChange(event: Event): void {
		const value = Number((event.target as HTMLInputElement).value);
		this.errorMocking.setHttpErrorPeriod(value);
	}

	protected onLatencyChange(event: Event): void {
		const value = Number((event.target as HTMLInputElement).value);
		this.errorMocking.httpLatency.set(value);
	}

	protected onErrorStatusChange(status: MockHttpErrorStatus): void {
		this.errorMocking.httpErrorStatus.set(status);
	}

	protected onThrowRuntimeError(): void {
		throw new Error('Mock runtime error from error mocking control');
	}
}

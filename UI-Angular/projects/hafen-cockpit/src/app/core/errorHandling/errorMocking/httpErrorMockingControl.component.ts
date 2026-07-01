import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ErrorMockingService } from './errorMocking.service';

@Component({
	selector: 'app-http-error-period-control',
	template: `
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
				max="5"
				step="1"
				[value]="errorMocking.httpLatency()"
				(input)="onLatencyChange($event)"
			/>
	`,
	styles: `
		:host {
			position: fixed;
			bottom: 0.5rem;
			right: 0.5rem;
			z-index: 1000;

			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			padding: 0.5rem;
			background-color: lightsalmon;
			border-radius: 0.5rem;

		}

		input[type='range'] {
			width: 10rem;
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpErrorMockingControl {
	protected readonly errorMocking = inject(ErrorMockingService);

	protected onPeriodChange(event: Event): void {
		const value = Number((event.target as HTMLInputElement).value);
		this.errorMocking.setHttpErrorPeriod(value);
	}

	protected onLatencyChange(event: Event): void {
		const value = Number((event.target as HTMLInputElement).value);
		this.errorMocking.httpLatency.set(value);
	}
}

import { Component, computed, effect, inject, OnDestroy, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { WidgetContainer } from '@cockpit/app/shared/widget/container/container';
import { PegelWidgetService } from './pegel-widget.service';
import { HttpError } from '@cockpit/app/core/errorHandling/httpError.class';
import { WithError } from '@cockpit/app/core/errorHandling/WithError.type';
import { isPegelDataDto, PegelDataDto } from './PegellData.dto';
import { MatProgressBarModule } from '@angular/material/progress-bar';

type ExhaustibleWithError<TData, TError extends Error> =
{ value: TData, type: 'data' } | { value: TError, type: 'error' } | { value: undefined, type: 'undefined' };
@Component({
	selector: 'app-pegel-widget',
	imports: [WidgetContainer, MatProgressBarModule],
	templateUrl: './pegel-widget.html',
	styleUrl: './pegel-widget.scss',
})
export class PegelWidget implements OnInit, OnDestroy {


	public readonly pegelService: PegelWidgetService = inject(PegelWidgetService);
	public readonly refreshBlocked: WritableSignal<boolean> = signal(false);
	// TODO: put in shared
	public readonly pegelCurrentExhaustible: Signal<ExhaustibleWithError<PegelDataDto, HttpError>> = computed(() => {
		const value: WithError<PegelDataDto, HttpError> | undefined = this.pegelService.pegelCurrent();
		if (!value) {
			return { value: undefined, type: 'undefined' };
		} else if (isPegelDataDto(value)) {
			return { value, type: 'data' };
		} else if (value instanceof HttpError) {
			return { value, type: 'error' };
		}
		return {} as never;
	});


	public onRefreshClick(): void {
		this.refreshBlocked.set(true);
		this.pegelService.fetchData();
	}

	public ngOnInit(): void {
		// Only fetch data once on init
		this.pegelService.fetchData();
	}
	public ngOnDestroy(): void {
		this.pegelService.destroy();
	}
}

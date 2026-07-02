import { Component, computed, inject, OnDestroy, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { WidgetContainer } from '@cockpit/app/shared/widget/container/container';
import { PegelWidgetService } from './pegel-widget.service';
import { HttpError } from '@cockpit/app/core/errorHandling/httpError.class';
import { WithError } from '@cockpit/app/core/errorHandling/WithError.type';
import { isPegelDataDto, PegelDataDto } from './PegellData.dto';

type ExhaustableWithError<TData, TError extends Error> =
{ value: TData, type: 'data' } | { value: TError, type: 'error' } | { value: undefined, type: 'undefined' };
@Component({
	selector: 'app-pegel-widget',
	imports: [WidgetContainer],
	templateUrl: './pegel-widget.html',
	styleUrl: './pegel-widget.scss',
})
export class PegelWidget implements OnInit, OnDestroy {


	public readonly pegelService: PegelWidgetService = inject(PegelWidgetService);
	// TODO: put in shared
	public readonly pegelCurrentExhaustable: Signal<ExhaustableWithError<PegelDataDto, HttpError>> = computed(() => {
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
	public readonly isPegelDataDto = isPegelDataDto;
	// public readonly pegelHasError: Signal<bo> = computed((): this.pegelService.pegelCurrent() is PegelDataDto => this.pegelService.pegelCurrent() instanceof HttpError);

	public ngOnInit(): void {
		// Only fetch data once on init
		this.pegelService.fetchData();
	}
	public ngOnDestroy(): void {
		this.pegelService.destroy();
	}
}

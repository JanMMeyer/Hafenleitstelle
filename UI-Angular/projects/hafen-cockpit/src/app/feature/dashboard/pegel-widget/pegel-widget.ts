import { Component, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { WidgetContainer } from '@cockpit/shared/widget/cell/cell';
import { PegelWidgetApiService } from './pegel-widget-api.service';
import { HttpError } from '@cockpit/app/core/errorHandling/httpError.class';
import { WithError } from '@cockpit/app/core/errorHandling/WithError.type';

@Component({
	selector: 'app-pegel-widget',
	imports: [WidgetContainer],
	templateUrl: './pegel-widget.html',
	styleUrl: './pegel-widget.scss',
})
export class PegelWidget implements OnInit {

	private readonly pegelWidgetApiService = inject(PegelWidgetApiService);

	public readonly pegelCurrent: WritableSignal<WithError<any, HttpError>> = signal<WithError<any, HttpError>>(null);

	public ngOnInit(): void {
		this.pegelWidgetApiService.getPegelCurrent().subscribe((pegelCurrent) => {
			this.pegelCurrent.set(pegelCurrent);
		});
	}
}

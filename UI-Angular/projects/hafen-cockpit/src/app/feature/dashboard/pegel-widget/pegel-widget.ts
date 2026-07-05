import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AsyncOutlet } from '@cockpit/app/core/async-outlet/async-outlet';
import { WidgetContainer } from '@cockpit/app/shared/widget/container/container';
import { PegelWidgetService } from './pegel-current.service';

@Component({
	selector: 'app-pegel-widget',
	imports: [WidgetContainer, MatProgressBarModule, AsyncOutlet],
	templateUrl: './pegel-widget.html',
	changeDetection: ChangeDetectionStrategy.Eager,
	styleUrl: './pegel-widget.scss',
})
export class PegelWidget implements OnDestroy {
	public readonly pegelService: PegelWidgetService = inject(PegelWidgetService);

	public ngOnDestroy(): void {
		this.pegelService.destroy();
	}
}

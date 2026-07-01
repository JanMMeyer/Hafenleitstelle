import {
	ChangeDetectionStrategy,
	Component,
	computed,
	ElementRef,
	inject,
	input,
	Input,
	InputSignal,
	OnDestroy,
	Signal,
	signal,
	WritableSignal,
} from '@angular/core';
import { WidgetService } from '../widget.service';

@Component({
	selector: 'app-widget-container',
	imports: [],
	host: {
		class: 'debug',
		// This way change detection is triggered "onPush...
		'[style.grid-row]': 'gridRow()',
		'[style.grid-column]': 'gridColumn()',
	},
	templateUrl: './container.html',
	styleUrl: './container.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WidgetContainer implements OnDestroy {
	protected readonly widgetService = inject(WidgetService);
	// TODO: catch non integer numbers and throw error, consider string type restricted to 1-12 ???
	public readonly row: InputSignal<number> = input(0);
	public readonly col: InputSignal<number> = input(0);
	public readonly rowSpan: InputSignal<number> = input(1);
	public readonly colSpan: InputSignal<number> = input(1);

	public readonly gridRow: Signal<string> = computed(
		() => `${this.row()} / span ${this.rowSpan()}`,
	);
	public readonly gridColumn: Signal<string> = computed(
		() => `${this.col()} / span ${this.colSpan()}`,
	);

	// ...Alternatively one could inject the elementRef and use an effect to set the style on native element,
	// but then change detection would not be triggered "onPush" anymore, and its less readable.

	public ngOnInit(): void {
		this.widgetService.addWidget(this);
	}

	public ngOnDestroy(): void {
		this.widgetService.removeWidget(this);
	}
}

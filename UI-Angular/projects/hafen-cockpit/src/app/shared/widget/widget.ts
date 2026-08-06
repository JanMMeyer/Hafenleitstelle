import {
	Component,
	DestroyRef,
	ElementRef,
	inject,
	OnInit,
	output,
	outputBinding,
	OutputEmitterRef,
	ViewContainerRef,
} from '@angular/core';
import { BaseWidget } from 'gridstack/dist/angular';
import { WidgetControl } from './WidgetControl.type';
import { GridItemHTMLElement } from 'gridstack';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	template: ``,
	styles: `
		:host {
			position: relative;
		}
	`,
})
export abstract class Widget extends BaseWidget implements OnInit {
	private gridstackItemElement: GridItemHTMLElement | null = null;
	private widgetElement: ElementRef<HTMLElement> = inject(ElementRef);
	private vcr = inject(ViewContainerRef);

	// Missing teardown, depending on the implementation of refresh(),
	// this might cause unexpected behavior (ghost fetches or reloads)
	protected readonly destroyRef = inject(DestroyRef);

	public abstract readonly widgetControlService: WidgetControl;

	public ngOnInit(): void {
		this.widgetControlService.refreshAllTrigger$
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe(() => this.refresh());
	}

	public ngAfterViewInit(): void {
		this.gridstackItemElement = this.widgetElement.nativeElement.closest('gridstack-item');
		this.vcr.createComponent(WidgetRemoveButton, {
			bindings: [outputBinding('onRemove', () => this.remove())],
		});
		// if (this.gridstackItemElement) {
		// 	this.widgetControlService.removeWidget(this.gridstackItemElement);
		// }
	}

	public abstract refresh(): void;

	private remove(): void {
		if (!this.gridstackItemElement) {
			throw new Error('gridstackItemElement undefined');
		}
		this.widgetControlService.removeWidget(this.gridstackItemElement);
	}
}

@Component({
	imports: [MatButtonModule, MatIconModule],
	template: `
		<button
			matMiniFab
			(click)="onRemove.emit()"
			class="remove-button show-hover-only fade-grand-parent-hover"
		>
			<mat-icon>delete</mat-icon>
		</button>
	`,
	styles: `
		:host {
			&:hover {
				.remove-button {
					opacity: 1;
				}
			}
			.remove-button {
				position: absolute;
				top: 63px;
				right: 18px;

				// width: 16px;
				// height: 16px;

				// display: flex;
				// padding-top: 2px;
				// align-items: center;
				// justify-content: center;

				// color: red;
				// cursor: pointer;
				// border-radius: 4px;

				// &:hover {
				// 	background-color: rgba(255, 0, 0, 0.1);
				// }
			}
		}
	`,
})
export class WidgetRemoveButton {
	readonly onRemove: OutputEmitterRef<void> = output();
}

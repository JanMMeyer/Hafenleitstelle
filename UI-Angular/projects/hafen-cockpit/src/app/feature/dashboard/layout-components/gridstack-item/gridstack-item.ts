import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-gridstack-item',
	imports: [MatIconModule],
	template: ` <div class="grid-stack-item">
		<div class="grid-stack-drag-handle-wrapper">
			<div class="grid-stack-drag-handle">
				<mat-icon>drag_indicator</mat-icon>
			</div>
			<ng-content class="widget"></ng-content>
		</div>
	</div>`,
	styles: `
		.grid-stack-item {
			.grid-stack-drag-handle-wrapper {
				display: flex;
				border-radius: 12px;
				background: rgba(grey, 0.5);
				.grid-stack-drag-handle {
					flex-shrink: 0;
					width: 1.5rem;

					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 12px;

					cursor: grab;
				}
			}
		}
	`,
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class GridstackItem {}

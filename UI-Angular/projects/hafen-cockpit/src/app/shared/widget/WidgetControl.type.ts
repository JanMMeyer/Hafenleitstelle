import { GridItemHTMLElement } from 'gridstack';
import { Subject } from 'rxjs';

export type WidgetControl = {
	readonly refreshAllTrigger$: Subject<void>;
	readonly removeWidget: (widget: GridItemHTMLElement) => void;
};

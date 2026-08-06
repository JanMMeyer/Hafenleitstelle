import { GridItemHTMLElement } from 'gridstack';
import { Subject } from 'rxjs';

// Interface Segregation: contracts are small and focused
// instead of forcing bulky interfaces
export type WidgetControl = {
	readonly refreshAllTrigger$: Subject<void>;
	readonly removeWidget: (widget: GridItemHTMLElement) => void;
};

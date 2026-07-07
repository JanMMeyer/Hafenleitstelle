import { Subject } from 'rxjs';

export type WidgetControl = {
	readonly refreshAllTrigger$: Subject<void>;
};

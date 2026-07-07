import { Injectable } from '@angular/core';
import { WidgetControl } from '@cockpit/app/shared/widget/WidgetControl.type';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DashboardService implements WidgetControl {
	public readonly refreshAllTrigger$: Subject<void> = new Subject<void>();
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DashboardService {
	public readonly refreshAllTrigger$: Subject<void> = new Subject<void>();
}

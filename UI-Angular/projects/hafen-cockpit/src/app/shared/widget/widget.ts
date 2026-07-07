import { Component, OnInit } from '@angular/core';
import { AsyncDataSource } from '@cockpit/app/core/types/AsyncDataSource.type';
import { BaseWidget } from 'gridstack/dist/angular';
import { WidgetControl } from './WidgetControl.type';

@Component({
	template: '<ng-content></ng-content>',
})
export abstract class Widget<T extends object> extends BaseWidget implements OnInit {
	public abstract readonly widgetDataService: AsyncDataSource<T>;
	public abstract readonly widgetControlService: WidgetControl;

	public ngOnInit(): void {
		this.widgetControlService.refreshAllTrigger$.subscribe(() => this.widgetDataService.load());
	}
}

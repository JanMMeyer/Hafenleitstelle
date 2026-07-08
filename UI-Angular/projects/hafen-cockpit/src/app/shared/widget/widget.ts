import { Component, OnInit } from '@angular/core';
import { BaseWidget } from 'gridstack/dist/angular';
import { WidgetControl } from './WidgetControl.type';

@Component({
	template: '<ng-content></ng-content>',
})
export abstract class Widget extends BaseWidget implements OnInit {
	public abstract readonly widgetControlService: WidgetControl;

	public ngOnInit(): void {
		this.widgetControlService.refreshAllTrigger$.subscribe(() => this.refresh());
	}

	public abstract refresh(): void;
}

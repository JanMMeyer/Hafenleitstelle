import { Component, computed, effect, EffectRef, input, InputSignal, OnDestroy, Signal, signal, TemplateRef, WritableSignal } from '@angular/core';
import { AsyncDataService } from '../../types/BusyDataSource.type';
import { Subject } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgTemplateOutlet } from '@angular/common';
import { implyNever } from '../../fundamentals/implyNever';
import { HttpError } from '../../errorHandling/httpError.class';
import { SwitchExhaustibleAsyncDataWrapper } from '../../types/SwitchExhaustibleAsyncDataWrapper.type';
import { WithError } from '../../types/WithError.type';

@Component({
	selector: 'app-async-outlet-data',
	imports: [MatProgressBarModule, NgTemplateOutlet],
	template: `
		<button (click)="refresh()" [disabled]="refreshBlocked()">Refresh</button>
		@if (asyncDataService().isBusy()) { <mat-progress-bar mode="indeterminate"></mat-progress-bar> }

		@let wrappedData = wrappedSwitchData();
		@switch (wrappedData.type) {
			@case ('undefined') {
				<span>...loading...</span>
			}
			@case ('error') {
				<span>Es gibt ein Problem mit der Serververbindung, bitte warten sie ein paar minuten und nutzen die Refresh-Funktion des Widgets.</span>
			}
			@case ('data') {
				<ng-container *ngTemplateOutlet="contentTemplate(); context: { data: wrappedData.value }" />
			}
			@default never(wrappedData);
		}
	`,
	// templateUrl: './async-outlet-data.html',
	styles: `
		:host {
			display: flex;
			flex-direction: column;
		}
	`
})
export class AsyncOutletData<TData extends object> {

	private readonly refreshBockTrigger$: Subject<void> = new Subject<void>();

	public readonly asyncDataService: InputSignal<AsyncDataService<TData>> = input.required();
	public readonly contentTemplate: InputSignal<TemplateRef<{ data: TData }>> = input.required();

	// public readonly mode: WritableSignal<'loading' | 'error' | 'data'> = signal<'loading' | 'error' | 'data'>('loading');
	public readonly wrappedSwitchData: Signal<SwitchExhaustibleAsyncDataWrapper<TData, HttpError>> = computed<SwitchExhaustibleAsyncDataWrapper<TData, HttpError>>(() =>{
		const value: WithError<TData, HttpError> | undefined = this.asyncDataService().data();
		if (!value) {
			return { value: undefined, type: 'undefined' };
		} else if (value instanceof HttpError) {
			return { value: value, type: 'error' };
		} else if (value instanceof Object) {
			return { value: value, type: 'data' };
		} else {
			return implyNever(value)
		}
	})

	public readonly refreshBlocked: WritableSignal<boolean> = signal(false);


	// this.vcr.createEmbeddedView(this.templateRef, {	data: value });
	// const frameRef: ComponentRef<AsyncOutletData<TData>> = this.vcr.createComponent(AsyncOutletData<TData>);
	// frameRef.setInput('contentTemplate', () => this.templateRef);
	// frameRef.setInput('context', { data: value });
	// frameRef.setInput('asyncDataService', () => this.appAsyncOutlet());

	public refresh(): void {

	}
}

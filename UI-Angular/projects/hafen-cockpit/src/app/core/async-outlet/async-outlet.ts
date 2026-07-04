import { ComponentRef, Directive, effect, EffectRef, inject, input, InputSignal, TemplateRef, ViewContainerRef } from '@angular/core';
import { AsyncDataService } from '../types/BusyDataSource.type';
import { AsyncOutletContainer } from './outlet-container/async-outlet-container';
import { setCompRefInputTyped } from '../fundamentals/setCompRefInputTyped';

// The purpose of this directive is to make handling of loading and error state easier
// and more consistent (also changeable in one place).
// More importantly, it nudges developers to catch and forward errors from async resources
//  and consider the initial undefined state.
@Directive({
	selector: '[appAsyncOutlet]',
})
// TData allows for null here, but that ok, might be a use case.
// It could be restricted to a custom type that includes primitives,
// but then you need a custom type guard... for now: just wrap it in an object.
// Consider: above suggestion.
export class AsyncOutlet<TData extends object> {

	private readonly templateRef: TemplateRef<{ data: TData }> = inject(TemplateRef<{ data: TData }>);
	private readonly vcr: ViewContainerRef = inject(ViewContainerRef);
	private readonly effectRef: EffectRef

	public readonly appAsyncOutlet: InputSignal<AsyncDataService<TData>> = input.required();

	constructor() {
		this.effectRef = effect(() => {
			const containerRef: ComponentRef<AsyncOutletContainer<TData>> = this.vcr.createComponent(AsyncOutletContainer<TData>);
			// not typesafe ...
			// frameRef.setInput('contentTemplate', () => this.templateRef);
			// frameRef.setInput('asyncDataService', () => this.appAsyncOutlet());
			// ... custom wrapper to the rescue:
			setCompRefInputTyped(containerRef, 'contentTemplate', this.templateRef);
			setCompRefInputTyped(containerRef, 'asyncDataService',this.appAsyncOutlet());
		});
	}

	ngOnDestroy(): void {
		this.effectRef.destroy();
	}
}



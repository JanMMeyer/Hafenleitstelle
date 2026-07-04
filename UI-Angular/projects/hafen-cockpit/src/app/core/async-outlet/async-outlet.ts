import { ComponentRef, Directive, effect, EffectRef, inject, input, InputSignal, TemplateRef, ViewContainerRef } from '@angular/core';
import { HttpError } from '../errorHandling/httpError.class';
import { implyNever } from '../fundamentals/implyNever';
import { AsyncDataService } from '../types/BusyDataSource.type';
import { AsyncOutletError } from './state-components/async-outlet-error';
import { AsyncOutletLoading } from './state-components/async-outlet-loading';
import { AsyncOutletContainer } from './async-outlet-container';


// static ngTemplateContextGuard<TData extends object>(
// 	_dir: AsyncOutletDirective<TData>,
// 	_ctx: unknown,
//   ): _ctx is { $implicit: TData; data: TData } {
// 	return true;
//   }

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

	public readonly appAsyncOutlet: InputSignal<AsyncDataService<TData>> = input.required();

	constructor() {
		const frameRef: ComponentRef<AsyncOutletContainer<TData>> = this.vcr.createComponent(AsyncOutletContainer<TData>);
		frameRef.setInput('contentTemplate', () => this.templateRef);
		frameRef.setInput('asyncDataService', () => this.appAsyncOutlet());
	}
}

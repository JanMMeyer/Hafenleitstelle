import {
	ComponentRef,
	Directive,
	effect,
	EffectRef,
	inject,
	input,
	InputSignal,
	TemplateRef,
	ViewContainerRef,
} from '@angular/core';
import { AsyncDataSource } from '../types/AsyncDataSource.type';
import { AsyncOutletContainer } from './outlet-container/async-outlet-container';
import { setCompRefInputTyped } from '../fundamentals/setCompRefInputTyped';

export type AsyncOutletContext<TData extends object> = {
	data: TData;
};

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
	static ngTemplateContextGuard<TData extends object>(
		_dir: AsyncOutlet<TData>,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		_ctx: unknown,
	): _ctx is AsyncOutletContext<TData> {
		return true;
	}

	private readonly templateRef: TemplateRef<{ data: TData }> = inject(TemplateRef<{ data: TData }>);
	private readonly vcr: ViewContainerRef = inject(ViewContainerRef);
	private readonly effectRef: EffectRef;

	public readonly appAsyncOutlet: InputSignal<AsyncDataSource<TData>> = input.required();

	constructor() {
		this.effectRef = effect(() => {
			const asyncOutlet = this.appAsyncOutlet(); //<- triggers effect when set

			if (!asyncOutlet) return;
			const containerRef: ComponentRef<AsyncOutletContainer<TData>> = this.vcr.createComponent(
				AsyncOutletContainer<TData>,
			);
			// not typesafe ...
			// frameRef.setInput('contentTemplate', () => this.templateRef);
			// frameRef.setInput('asyncDataService', () => this.appAsyncOutlet());
			// ... custom wrapper to the rescue:
			setCompRefInputTyped(containerRef, 'contentTemplate', this.templateRef);
			setCompRefInputTyped(containerRef, 'asyncDataService', asyncOutlet);
		});
	}

	ngOnDestroy(): void {
		this.effectRef.destroy();
	}
}

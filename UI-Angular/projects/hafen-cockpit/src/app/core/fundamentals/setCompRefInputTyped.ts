import { ComponentRef, InputSignal } from '@angular/core';

export function setCompRefInputTyped<TComponent, TInputName extends keyof TComponent & string>(
	componentRef: ComponentRef<TComponent>,
	name: TInputName,
	// This is an exception to the no-any rule,
	// because because this only check wether the input is a signal or not an we can't know the type of the signal.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: TComponent[TInputName] extends InputSignal<any>
		? ReturnType<TComponent[TInputName]>
		: never,
): void {
	componentRef.setInput(name, value);
}

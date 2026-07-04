import { ComponentRef, InputSignal } from "@angular/core";

export function setCompRefInputTyped<TComponent, TInputName extends keyof TComponent & string>(
    componentRef: ComponentRef<TComponent>,
    name: TInputName,
    value: TComponent[TInputName] extends InputSignal<any> ? ReturnType<TComponent[TInputName]> : never,
): void {
	componentRef.setInput(name, value);
}
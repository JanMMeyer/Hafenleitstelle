import { Signal } from "@angular/core";
import { WithError } from "./WithError.type";
import { HttpError } from "../errorHandling/httpError.class";

export type AsyncDataService<TData extends object> = {
	fetchData(): void
	isBusy: Signal<boolean>
	data: Signal<WithError<TData, HttpError> | undefined>
};
import { Signal } from '@angular/core';
import { WithError } from './WithError.type';
import { HttpError } from '../errorHandling/httpError.class';

export type AsyncDataSource<TData extends object> = {
	load(): void;
	isLoading: Signal<boolean>;
	data: Signal<WithError<TData, HttpError> | undefined>;
};

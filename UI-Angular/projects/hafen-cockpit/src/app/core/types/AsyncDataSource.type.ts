import { Observable } from 'rxjs';
import { WithError } from './WithError.type';
import { HttpError } from '../errorHandling/httpError.class';
import { Signal } from '@angular/core';

// Interface Segregation: contracts are small and focused
// instead of forcing bulky interfaces
export type AsyncDataSource<TData extends object> = {
	load(): void;
	isLoading$: Observable<boolean>;
	data: Signal<WithError<TData, HttpError> | undefined>;
};

import { inject } from '@angular/core';
import { ErrorLoggingService } from '../errorHandling/errorLogging.service';
import { Serializable } from '../types/Basic.type';

export class LocalStorageAccessor<T extends Serializable> {
	public static readonly useUniqueStorageKeys: Set<string> = new Set();

	private readonly errorLoggingService: ErrorLoggingService = inject(ErrorLoggingService);

	constructor(private readonly uniqueStorageKey: string) {
		if (LocalStorageAccessor.useUniqueStorageKeys.has(uniqueStorageKey)) {
			// catching non unique storage keys at runtime is the best i can do... ideas?
			throw new Error(`Unique storage key ${uniqueStorageKey} already in use`);
		}
		LocalStorageAccessor.useUniqueStorageKeys.add(uniqueStorageKey);
	}

	save(value: T): void {
		try {
			const jsonValue = JSON.stringify(value);
			localStorage.setItem(this.uniqueStorageKey, jsonValue);
		} catch (error) {
			this.errorLoggingService.logError(
				error instanceof Error ? error : new TypeError('Caught not an Error', { cause: error }),
			);
			alert(
				'Error saving to local storage. You can continue, but settings will be lost when leaving or refreshing the page.',
			);
		}
	}

	load(): T | null | Error {
		try {
			const value = localStorage.getItem(this.uniqueStorageKey);
			return value ? (JSON.parse(value) as T) : null;
		} catch (error) {
			const loggableError =
				error instanceof Error ? error : new TypeError('Caught not an Error', { cause: error });
			this.errorLoggingService.logError(loggableError);
			alert(
				'Error saving to local storage. You can continue, but settings will be lost when leaving or refreshing the page.',
			);
			return loggableError;
		}
	}

	remove(): void {
		localStorage.removeItem(this.uniqueStorageKey);
	}
}

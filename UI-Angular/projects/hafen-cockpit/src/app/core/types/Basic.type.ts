export type Primitive = string | number | boolean | null;

export function isPrimitive<T>(value: T): value is Primitive & T {
	return (
		typeof value === 'string' ||
		typeof value === 'number' ||
		typeof value === 'boolean' ||
		value === null
	);
}

export type KeyOf<T> = keyof T & string;

//TODO: Validate if symbols are allowed as keys
export type Serializable =
	| Primitive
	| Serializable[]
	| {
			[key: string | number]: Serializable;
	  };

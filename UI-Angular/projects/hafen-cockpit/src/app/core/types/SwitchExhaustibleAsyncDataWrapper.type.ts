export type SwitchExhaustibleAsyncDataWrapper<TData, TError extends Error> =
{ value: TData, type: 'data' } | { value: TError, type: 'error' } | { value: undefined, type: 'undefined' };
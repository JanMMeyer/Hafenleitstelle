// Aus altem projekt "geliehen" und angepasst

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Injectable } from "@angular/core"
import {  Observable, retry, throwError, timer } from "rxjs"

// 404 = not found, 500 = internal server error <- not use in retry
// 408 = request timeout, 504 = Gateway Timeout, 503 = (kind of) internal server timeout due to overload <- retryable
const errorStatusToRetry: ReadonlySet<number> = new Set<number>([408, 503, 504])
const shouldSkipRetry: (errorResponse: HttpErrorResponse) => boolean =
	(errorResponse: HttpErrorResponse) => !errorResponse.status || !errorStatusToRetry.has(errorResponse.status)


const delayInMs = 200;
const maxRetries = 3;
const getRetryDelay = (retryCount: number) => Math.pow(2, retryCount - 1) * delayInMs;
// Da sich die maximale Gesamtdauer der retries von den der summe der einzelnen delays abhängt
// muss diese at compile time berechnet werden (geometrische Reihe): 2⁰ + 2¹ + … + 2^(maxRetries−1) = 2^maxRetries − 1
// (Formel von Claude, Idee von mir, Beweis per induktion wenn gewünscht :)
// Kann verwendet werden um refresh buttons zu deaktivieren wenn die maximale Gesamtdauer der retries erreicht ist um refresh spam durch nutzer zu verhindern,
// erlaubt aber auch Freigab nach z.B der hälfte der Zeit, falls gewünscht.
const maxRetryDurationInMs = (Math.pow(2, maxRetries) - 1) * delayInMs;
// TODO: Use config token if time allows, this is a temporary solution
export const HTTP_RETRY_CONFIG: Readonly<{ maxRetries: number, delay: number, errorLoggingPath: string, maxRetryDurationInMs: number }> = {
	maxRetries,
	delay: delayInMs,
	errorLoggingPath: '/error/add',
	maxRetryDurationInMs
};


export function httpErrorRetryInterceptor(
	request: HttpRequest<unknown>,
	handleHttp: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
	return handleHttp(request).pipe(
		retry({
			count: HTTP_RETRY_CONFIG.maxRetries,
			delay: (error: HttpErrorResponse, retryCount: number) =>
				shouldSkipRetry(error) ? throwError(() => error) : timer(getRetryDelay(retryCount))
		})
	)
}
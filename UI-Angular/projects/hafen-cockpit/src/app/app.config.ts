import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GlobalAppErrorHandler } from './core/errorHandling/globalAppErrorHandler.class';
import { ErrorLoggingService } from './core/errorHandling/errorLogging.service';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorMockingInterceptor } from './core/errorHandling/errorMocking/httpErrorMocking.interceptor';
import { httpErrorLoggingInterceptor } from './core/errorHandling/errorLogging.interceptor';
import { httpErrorRetryInterceptor } from './core/errorHandling/errorRetry.interceptor';


// Erwägung: Http Interceptor der Header mit Session- und Request-UUID anreichert.
// Anwendung: Error tracing, request tracking für busy state.

// Erwägung: Wrapper für HttpClient als HttpClient providen, der HTTP error catch und return aller http requests zu type "Observable<WithError<T, HttpError>>" überschreibt.
// Vorteil: Entwickler wird "gezwungen" http errors zu behandeln und kann dies nicht in einer Api-Service implementation umgehen.

// Problem: Pegel Online bietet leider keine ApiSpec (Swagger, OpenAPI, etc.)
// Erwägung: JSON Validation im interceptor um alle json responses zu validieren.
// Bei vorhandener ApiSpec wären "onBuild" generierte Endpoints vorzuziehen -> fail on build besser als fail at runtime.
// Vorteil: Klareres Bug tracking -> fehler liegt an missmatch von erwarteter und tatsächlicher response.
export const appConfig: ApplicationConfig = {
	providers: [
		{ provide: ErrorHandler, useClass: GlobalAppErrorHandler, deps: [ErrorLoggingService] },
		// Interceptors are executed in the order they are provided for a REQUEST. Meaning that the LAST interceptor sees the RESPONSE first.
		//                                  REQEST execution order ->                               <- RESPONSE execution order
		provideHttpClient(withInterceptors([httpErrorLoggingInterceptor, httpErrorMockingInterceptor])),
		provideRouter(routes),
	],
};

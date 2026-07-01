import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { GlobalAppErrorHandler } from './core/errorHandling/globalAppErrorHandler.class';
import { ErrorTracingService } from './core/errorHandling/errorTracing.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorMockingInterceptor } from './core/errorHandling/errorMocking/httpErrorMocking.interceptor';

export const appConfig: ApplicationConfig = {
	providers: [
		{ provide: ErrorHandler, useClass: GlobalAppErrorHandler, deps: [ErrorTracingService] },
		provideHttpClient(withInterceptors([httpErrorMockingInterceptor])),
		provideRouter(routes),
	],
};

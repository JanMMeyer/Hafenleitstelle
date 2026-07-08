import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AsyncDataSource } from '@cockpit/app/core/types/AsyncDataSource.type';
import { AsyncDataSourceService } from '@cockpit/app/shared/async-data-source/abstract.async-data.service';
import { environment } from '@cockpit/environments';
import { map, Observable, tap } from 'rxjs';
import { isWeatherAlertsDto, WeatherAlertsDto } from './WeatherAlert.dto';
import { mockAlert } from './mockAlert';

// TODO use ng-openapi gen with https://api.brightsky.dev/openapi.json
@Injectable()
export class WeatherAlertWidgetService
	extends AsyncDataSourceService<WeatherAlertsDto>
	implements AsyncDataSource<WeatherAlertsDto>
{
	private readonly baseApiUrlString: string = 'https://api.brightsky.dev/alerts';

	private readonly dataUrl: URL;

	private readonly http: HttpClient = inject(HttpClient);

	public constructor() {
		super();
		if (!URL.canParse(this.baseApiUrlString)) {
			throw new URIError('Endpoint URL is not a valid URL:' + this.baseApiUrlString);
		}
		const endpointUrl: URL = new URL(this.baseApiUrlString);
		endpointUrl.searchParams.append('lat', environment.locationGps.lat.toString());
		endpointUrl.searchParams.append('lon', environment.locationGps.lon.toString());
		this.dataUrl = endpointUrl;
	}

	protected override fetchData(): Observable<WeatherAlertsDto> {
		console.log('fetching WeatherAlerts');
		return this.http.get<WeatherAlertsDto>(this.dataUrl.toString()).pipe(
			tap((data) => {
				if (!isWeatherAlertsDto(data)) {
					throw new TypeError('Invalid data in fetchWeatherAlerts', { cause: data });
				}
			}),
			map((alerts: WeatherAlertsDto) => {
				if (environment.production || alerts.alerts.length > 0) {
					return alerts;
				}
				return mockAlert;
			}),
		);
	}
}

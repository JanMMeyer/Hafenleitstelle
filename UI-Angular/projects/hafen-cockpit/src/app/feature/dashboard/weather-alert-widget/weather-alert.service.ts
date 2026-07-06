import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AsyncDataSource } from '@cockpit/app/core/types/AsyncDataSource.type';
import { AsyncDataSourceService } from '@cockpit/app/shared/async-data-source/abstract.async-data.service';
import { map, Observable, of } from 'rxjs';
import { WeatherAlertsDto } from './WeatherAlert.dto';
import { mockAlert } from './mockAlert';

//  TODO location as injectable token, or environment that can be set during build time
const locationGpsCoords: { lat: number; lon: number } = { lat: 53.55416, lon: 9.95833 };
const maxDistanceFromLocation: number = 10000;

// TODO use ng-openapi gen with https://api.brightsky.dev/openapi.json
@Injectable()
export class WeatherAlertWidgetService
	extends AsyncDataSourceService<WeatherAlertsDto>
	implements AsyncDataSource<WeatherAlertsDto>
{
	private readonly baseApiUrl: string = 'https://api.brightsky.dev/alerts';

	private readonly UrlParams = new HttpParams()
		.set('lat', locationGpsCoords.lat)
		.set('lon', locationGpsCoords.lon);

	private readonly weatherCurrentUrl = this.baseApiUrl + '?' + this.UrlParams.toString();

	private readonly http: HttpClient = inject(HttpClient);

	protected override fetchData(): Observable<WeatherAlertsDto> {
		console.log('fetching WeatherCurrent');
		return this.http.get<WeatherAlertsDto>(this.weatherCurrentUrl).pipe(
			map((alerts: WeatherAlertsDto) => {
				return alerts.alerts.length > 0 ? alerts : mockAlert;
			}),
		);
	}
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AsyncDataSource } from '@cockpit/app/core/types/AsyncDataSource.type';
import { AsyncDataSourceService } from '@cockpit/app/shared/async-data-source/abstract.async-data.service';
import { Observable } from 'rxjs';
import { WeatherDataDto } from './WeatherData.dto';

//  TODO location as injectable token, or environment that can be set during build time
const locationGpsCoords: { lat: number; lon: number } = { lat: 53.55416, lon: 9.95833 };
const maxDistanceFromLocation: number = 10000;

// TODO use ng-openapi gen with https://api.brightsky.dev/openapi.json
@Injectable()
export class WeatherWidgetService
	extends AsyncDataSourceService<WeatherDataDto>
	implements AsyncDataSource<WeatherDataDto>
{
	private readonly baseApiUrl: string = 'https://api.brightsky.dev/current_weather';

	private readonly UrlParams = new HttpParams()
		.set('lat', locationGpsCoords.lat)
		.set('lon', locationGpsCoords.lon)
		.set('max_dist', maxDistanceFromLocation);

	private readonly weatherCurrentUrl = this.baseApiUrl + '?' + this.UrlParams.toString();

	private readonly http: HttpClient = inject(HttpClient);

	protected override fetchData(): Observable<WeatherDataDto> {
		console.log('fetching WeatherCurrent');
		return this.http.get<WeatherDataDto>(this.weatherCurrentUrl);
	}
}

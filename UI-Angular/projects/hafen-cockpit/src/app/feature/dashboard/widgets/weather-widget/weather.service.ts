import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AsyncDataSource } from '@cockpit/app/core/types/AsyncDataSource.type';
import { AsyncDataSourceService } from '@cockpit/app/shared/async-data-source/abstract.async-data.service';
import { environment } from '@cockpit/environments';
import { Observable, tap } from 'rxjs';
import { isWeatherDataDto, WeatherDataDto } from './WeatherData.dto';

// Fail-fast construction: URL validity is checked early in services,
// preventing hidden runtime drift
const maxDistanceFromLocation: number = 10000;

// TODO use ng-openapi gen with https://api.brightsky.dev/openapi.json
@Injectable()
export class WeatherWidgetService
	extends AsyncDataSourceService<WeatherDataDto>
	implements AsyncDataSource<WeatherDataDto>
{
	private readonly baseApiUrlString: string = 'https://api.brightsky.dev/current_weather';

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
		endpointUrl.searchParams.append('max_dist', maxDistanceFromLocation.toString());
		this.dataUrl = endpointUrl;
	}

	protected override fetchData(): Observable<WeatherDataDto> {
		console.log('fetching WeatherCurrent');
		return this.http.get<WeatherDataDto>(this.dataUrl.toString()).pipe(
			tap((data) => {
				if (!isWeatherDataDto(data)) {
					throw new TypeError('Invalid data in fetchWeatherCurrent', { cause: data });
				}
			}),
		);
	}
}

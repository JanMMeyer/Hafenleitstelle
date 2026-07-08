import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AsyncDataSource } from '@cockpit/app/core/types/AsyncDataSource.type';
import { AsyncDataSourceService } from '@cockpit/app/shared/async-data-source/abstract.async-data.service';
import { catchError, combineLatest, forkJoin, map, Observable, of, tap } from 'rxjs';
import { PegelChartData } from './PegelChartData.model';
import { isPegelMeasurementDataDto, PegelMeasurementDataDto } from './PegelData.dto';

//  TODO location as injectable token

const locationUUID: string = 'd488c5cc-4de9-4631-8ce1-0db0e700b546';

// /W/measurements.json?start=P7D&width=440&height=220';

// TODO use ng-openapi gen with  https://raw.githubusercontent.com/bundesAPI/pegel-online-api/main/openapi.yaml
@Injectable()
export class PegelChartService
	extends AsyncDataSourceService<PegelChartData>
	implements AsyncDataSource<PegelChartData>
{
	private readonly baseApiUrlString: string =
		'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/';

	private readonly histoDataUrl: URL;
	private readonly forecastDataUrl: URL;
	private readonly http: HttpClient = inject(HttpClient);

	public constructor() {
		super();

		const histoEndpointUrlString: string = `${this.baseApiUrlString}${locationUUID}/W/`;
		if (!URL.canParse(histoEndpointUrlString)) {
			// failing as early as possible
			throw new URIError('Endpoint URL is not a valid URL:' + histoEndpointUrlString);
		}
		const histoEndpointUrl: URL = new URL('measurements.json', histoEndpointUrlString);
		histoEndpointUrl.searchParams.append('start', 'P1D');
		this.histoDataUrl = histoEndpointUrl;

		const forecastEndpointUrlString: string = `${this.baseApiUrlString}${locationUUID}/WV/`;
		if (!URL.canParse(forecastEndpointUrlString)) {
			// failing as early as possible
			throw new URIError('Endpoint URL is not a valid URL:' + forecastEndpointUrlString);
		}
		const forecastEndpointUrl: URL = new URL('measurements.json', forecastEndpointUrlString);
		this.forecastDataUrl = forecastEndpointUrl;

		// https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/1d26e504-7f9e-480a-b52c-5932be6549ab.json?includeForecastTimeseries=true
	}

	protected override fetchData(): Observable<PegelChartData> {
		// use the right rxjs operator to combine the two observables, one that fires once and  completes
		return forkJoin({
			histo: this.fetchHistoData(),
			forecast: this.fetchForecastData().pipe(
				catchError((error) => {
					if (
						error instanceof HttpErrorResponse &&
						error.status === 404 &&
						error.error.message === 'Timeseries does not exist.'
					) {
						return of([]);
					}
					throw error;
				}),
			),
		}).pipe(
			map(
				({
					histo,
					forecast,
				}: {
					histo: PegelMeasurementDataDto;
					forecast: PegelMeasurementDataDto;
				}) => {
					const chartData: PegelChartData = {
						datasets: [{ data: histo }, { data: forecast }],
					};
					return chartData;
				},
			),
		);
	}

	private fetchHistoData(): Observable<PegelMeasurementDataDto> {
		console.log('fetching PegelHisto');
		return this.http.get<PegelMeasurementDataDto>(this.histoDataUrl.toString()).pipe(
			tap((data) => {
				if (!isPegelMeasurementDataDto(data)) {
					throw new TypeError('Invalid data in fetchHistoData', { cause: data });
				}
			}),
		);
	}

	private fetchForecastData(): Observable<PegelMeasurementDataDto> {
		console.log('fetching PegelHisto');
		return this.http.get<PegelMeasurementDataDto>(this.forecastDataUrl.toString()).pipe(
			tap((data) => {
				if (!isPegelMeasurementDataDto(data)) {
					throw new TypeError('Invalid data in fetchForecastData', { cause: data });
				}
			}),
		);
	}
}

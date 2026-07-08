import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AsyncDataSource } from '@cockpit/app/core/types/AsyncDataSource.type';
import { AsyncDataSourceService } from '@cockpit/app/shared/async-data-source/abstract.async-data.service';
import { environment } from '@cockpit/environments';
import { Observable, tap } from 'rxjs';
import { isPegelDataDto, PegelDataDto } from './PegelData.dto';

// TODO use ng-openapi gen with  https://raw.githubusercontent.com/bundesAPI/pegel-online-api/main/openapi.yaml
@Injectable()
export class PegelCurrentService
	extends AsyncDataSourceService<PegelDataDto>
	implements AsyncDataSource<PegelDataDto>
{
	private readonly baseApiUrlString: string =
		'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/';

	private readonly dataUrl: URL;

	private readonly http: HttpClient = inject(HttpClient);

	public constructor() {
		super();
		const endpointUrlString: string = `${this.baseApiUrlString}${environment.pegelStationUuid}/`;
		if (!URL.canParse(endpointUrlString)) {
			throw new URIError('Endpoint URL is not a valid URL:' + endpointUrlString);
		}
		// W.json?includeCurrentMeasurement=true bringt laut Doku "Die Wasserstandszeitreihe des Pegels [...] mit dem aktuelle Messwert."
		// stimmt aber nicht, es enthält NUR currentMeasurement, aber keine Timeseries....
		const endpointUrl: URL = new URL('W.json', endpointUrlString);
		endpointUrl.searchParams.append('includeCurrentMeasurement', 'true');
		this.dataUrl = endpointUrl;
	}

	protected override fetchData(): Observable<PegelDataDto> {
		console.log('fetching PegelCurrent');
		return this.http.get<PegelDataDto>(this.dataUrl.toString()).pipe(
			tap((data) => {
				if (!isPegelDataDto(data)) {
					throw new TypeError('Invalid data in fetchPegelCurrent', { cause: data });
				}
			}),
		);
	}
}

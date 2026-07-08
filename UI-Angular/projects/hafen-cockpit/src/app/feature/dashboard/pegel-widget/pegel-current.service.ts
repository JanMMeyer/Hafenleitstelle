import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AsyncDataSource } from '@cockpit/app/core/types/AsyncDataSource.type';
import { AsyncDataSourceService } from '@cockpit/app/shared/async-data-source/abstract.async-data.service';
import { Observable } from 'rxjs';
import { PegelDataDto } from './PegelData.dto';

//  TODO from environment that can be set during build time, for other customers deployments with other locations
const locationUUID: string = 'd488c5cc-4de9-4631-8ce1-0db0e700b546';

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
		const endpointUrlString: string = `${this.baseApiUrlString}${locationUUID}/`;
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
		return this.http.get<PegelDataDto>(this.dataUrl.toString());
	}
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AsyncDataSource } from '@cockpit/app/core/types/AsyncDataSource.type';
import { AsyncDataSourceService } from '@cockpit/app/shared/async-data-source/abstract.async-data.service';
import { Observable } from 'rxjs';
import { PegelDataDto } from './PegelData.dto';

//  TODO location as injectable token

const locationUUID: string = 'd488c5cc-4de9-4631-8ce1-0db0e700b546';

// /W/measurements.json?start=P7D&width=440&height=220';

// TODO use ng-openapi gen with  https://raw.githubusercontent.com/bundesAPI/pegel-online-api/main/openapi.yaml
@Injectable()
export class PegelHistoService
	extends AsyncDataSourceService<PegelDataDto>
	implements AsyncDataSource<PegelDataDto>
{
	private readonly baseApiUrlString: string =
		'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/';

	private readonly dataUrl: URL;
	private readonly http: HttpClient = inject(HttpClient);

	public constructor() {
		super();
		const endpointUrlString: string = `${this.baseApiUrlString}${locationUUID}/W/`;
		if (!URL.canParse(endpointUrlString)) {
			// hope this fails at compile time
			throw new Error('Endpoint URL is not a valid URL');
		}
		const endpointUrl: URL = new URL('measurements.json.json', endpointUrlString);
		endpointUrl.searchParams.append('start', 'P1D');
		this.dataUrl = endpointUrl;
	}

	protected override fetchData(): Observable<PegelDataDto> {
		console.log('fetching PegelHisto');
		return this.http.get<PegelDataDto>(this.dataUrl.toString());
	}
}

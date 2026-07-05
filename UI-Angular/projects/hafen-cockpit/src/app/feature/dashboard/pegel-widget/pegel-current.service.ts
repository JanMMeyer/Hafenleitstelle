import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AsyncDataSource } from '@cockpit/app/core/types/AsyncDataSource.type';
import { AsyncDataSourceService } from '@cockpit/app/shared/async-data-source/abstract.async-data.service';
import { Observable } from 'rxjs';
import { PegelDataDto } from './PegelData.dto';

//  TODO location as injectable token, or environment that can be set during build time
const locationUUID: string = 'd488c5cc-4de9-4631-8ce1-0db0e700b546';

// TODO use ng-openapi gen with  https://raw.githubusercontent.com/bundesAPI/pegel-online-api/main/openapi.yaml

@Injectable()
export class PegelWidgetService
	extends AsyncDataSourceService<PegelDataDto>
	implements AsyncDataSource<PegelDataDto>
{
	private readonly baseApiUrl: string =
		'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/';

	private readonly pegelCurrentUrl =
		this.baseApiUrl + locationUUID + '/W.json?includeCurrentMeasurement=true';

	private readonly http: HttpClient = inject(HttpClient);

	protected override fetchData(): Observable<PegelDataDto> {
		console.log('fetching PegelCurrent');
		return this.http.get<PegelDataDto>(this.pegelCurrentUrl);
	}
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

//TODO location as injectable token
// 'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/${location}/W/measurements.png?start=P7D&width=440&height=220';
@Injectable()
export class PegelWidgetApiService {
	private readonly baseApiUrl: string =
		'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/';
	private readonly locationUUID: string = 'd488c5cc-4de9-4631-8ce1-0db0e700b546';

	private readonly pegelCurrentUrl =
		this.baseApiUrl + this.locationUUID + 'W.json?includeCurrentMeasurement=true';
	private readonly pegelHistoryPngUrl =
		this.baseApiUrl + this.locationUUID + 'W/measurements.png?start=P7D&width=440&height=220';

	private readonly http: HttpClient = inject(HttpClient);
}

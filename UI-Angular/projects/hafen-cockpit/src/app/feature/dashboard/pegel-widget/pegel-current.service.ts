import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AsyncDataSource } from '@cockpit/app/core/types/AsyncDataSource.type';
import { AsyncDataSourceService } from '@cockpit/app/shared/async-data-source/abstract.async-data.service';
import { Observable } from 'rxjs';
import { PegelDataDto } from './PegelData.dto';

//  TODO location as injectable token
// 'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/${location}/W/measurements.png?start=P7D&width=440&height=220';

// Move providers: [PegelWidgetService] from App to PegelWidget if the service should die with the widget.
// In the service constructor, use inject(DestroyRef) + takeUntilDestroyed(this.destroyRef) for lifecycle-bound streams.
// Keep cancelFetchDataRequests() (or switchMap on a refresh Subject) for replacing in-flight HTTP on refresh.
// Drop manual destroy() / ngOnDestroy once everything uses takeUntilDestroyed(DestroyRef).
// AsyncOutletContainer already uses takeUntilDestroyed() correctly — but that works because it’s a component in an injection context. The same API works in a scoped service if DestroyRef comes from the component that provides the service.
@Injectable()
export class PegelWidgetService
	extends AsyncDataSourceService<PegelDataDto>
	implements AsyncDataSource<PegelDataDto>
{
	private readonly baseApiUrl: string =
		'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations/';
	private readonly locationUUID: string = 'd488c5cc-4de9-4631-8ce1-0db0e700b546';

	private readonly pegelCurrentUrl =
		this.baseApiUrl + this.locationUUID + '/W.json?includeCurrentMeasurement=true';
	private readonly pegelHistoryPngUrl =
		this.baseApiUrl + this.locationUUID + '/W/measurements.png?start=P7D&width=440&height=220';

	private readonly http: HttpClient = inject(HttpClient);

	protected override fetchData(): Observable<PegelDataDto> {
		console.log('fetchPegelCurrent');
		return this.http.get<PegelDataDto>(this.pegelCurrentUrl);
	}
}

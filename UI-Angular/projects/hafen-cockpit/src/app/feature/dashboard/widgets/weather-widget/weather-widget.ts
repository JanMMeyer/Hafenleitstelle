import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { AsyncOutlet } from '@cockpit/app/core/async-outlet/async-outlet';
import { Widget } from '@cockpit/app/shared/widget/widget';
import { DashboardService } from '../../dashboard.service';
import { WeatherWidgetService } from './weather.service';
// using https://erikflowers.github.io/weather-icons/
@Component({
	selector: 'app-weather-widget',
	imports: [AsyncOutlet, MatCardModule, MatListModule, DatePipe],
	providers: [WeatherWidgetService],
	template: `
		<mat-card>
			<mat-card-content>
				<mat-list *appAsyncOutlet="widgetDataService; let weatherData = data">
					@let weather = weatherData.weather;
					<mat-list-item>
						{{ weather.timestamp | date: 'dd.MM.yy HH:mm' }}
					</mat-list-item>
					<mat-list-item>
						<span matListItemTitle>Wetter Bedingungen</span>
						<span matListItemLine>{{ weather.condition }}</span>
					</mat-list-item>
					<mat-list-item>
						<span matListItemTitle>Temperatur</span>
						<span matListItemLine>{{ weather.temperature }}<span class="data-unit">°C</span></span>
					</mat-list-item>
					<mat-list-item>
						<span matListItemTitle>Wind Richtung @ Geschwindigkeit</span>
						<span matListItemLine>
							@if (weather.wind_direction_10) {
								{{ weather.wind_direction_10 }}°
							} @else {
								123°<span class="fake"> (fake)</span>
							}
							<span class="at-symbol">@</span>
							@if (weather.wind_speed_10) {
								{{ weather.wind_speed_10 }}<span class="data-unit">km/h</span>
							} @else {
								123<span class="data-unit">km/h</span><span class="fake"> (fake)</span>
							}
						</span>
					</mat-list-item>
				</mat-list>
			</mat-card-content>
		</mat-card>
	`,
	styles: `
		mat-card {
			height: 100%;
		}
		span.at-symbol {
			font-size: 1rem;
			position: relative;
			top: -0.3rem;
			margin-left: 0.3rem;
			margin-right: 0.1rem;
		}
		span.fake {
			position: relative;
			top: -0.6rem;
			font-size: 0.5rem;
			color: #999;
		}
	`,
})
export class WeatherWidget extends Widget {
	public readonly widgetDataService: WeatherWidgetService = inject(WeatherWidgetService);
	public readonly widgetControlService: DashboardService = inject(DashboardService);

	public refresh(): void {
		this.widgetDataService.load();
	}
}

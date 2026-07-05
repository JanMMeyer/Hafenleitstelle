import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { AsyncOutlet } from '@cockpit/app/core/async-outlet/async-outlet';
import { WidgetContainer } from '@cockpit/app/shared/widget/container/widget-container';
import { WeatherWidgetService } from './weather.service';
// using https://erikflowers.github.io/weather-icons/
@Component({
	selector: 'app-weather-widget',
	imports: [WidgetContainer, AsyncOutlet, MatCardModule, MatListModule, DatePipe],
	providers: [WeatherWidgetService],
	template: `
		<app-widget-container [row]="1" [col]="1" [rowSpan]="1" [colSpan]="4">
			<mat-card>
				<mat-list *appAsyncOutlet="weatherService; let weatherData = data">
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
						<span matListItemLine
							>{{ weather.wind_direction_10 }}°<span class="at-symbol">@</span>
							{{ weather.wind_speed_10 }}<span class="data-unit">km/h</span>
						</span>
					</mat-list-item>
				</mat-list>
			</mat-card>
		</app-widget-container>
	`,
	styles: `
		:host {
			display: contents;
			app-widget-container {
				display: block;
				mat-card {
					padding: 0.5rem;
					height: 100%;
				}
			}
			span.at-symbol {
				font-size: 1rem;
				position: relative;
				top: -0.3rem;
				margin-left: 0.3rem;
				margin-right: 0.1rem;
			}
		}
	`,
})
export class WeatherWidget {
	protected readonly weatherService: WeatherWidgetService = inject(WeatherWidgetService);
}

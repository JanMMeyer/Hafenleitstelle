import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { AsyncOutlet } from '@cockpit/app/core/async-outlet/async-outlet';
import { BaseWidget } from 'gridstack/dist/angular';
import { WeatherAlert } from './alert/weather-alert';
import { WeatherAlertWidgetService } from './weather-alert.service';

@Component({
	selector: 'app-weather-alert-widget',
	imports: [AsyncOutlet, MatCardModule, MatListModule, WeatherAlert],
	providers: [WeatherAlertWidgetService],
	template: `
		<mat-card>
			<mat-card-content>
				<ng-container *appAsyncOutlet="weatherAlertService; let weatherData = data">
					@let alerts = weatherData.alerts;
					@for (alert of alerts; track alert.id) {
						<app-weather-alert
							[weatherAlert]="alert"
							[alertLocation]="weatherData.location"
						></app-weather-alert>
					}
				</ng-container>
			</mat-card-content>
		</mat-card>
	`,
	styles: `
		mat-card {
			height: 100%;
		}
	`,
})
export class WeatherAlertWidget extends BaseWidget {
	protected readonly weatherAlertService: WeatherAlertWidgetService =
		inject(WeatherAlertWidgetService);
}

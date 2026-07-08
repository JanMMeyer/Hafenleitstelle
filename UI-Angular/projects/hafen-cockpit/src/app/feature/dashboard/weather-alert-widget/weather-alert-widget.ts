import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { AsyncOutlet } from '@cockpit/app/core/async-outlet/async-outlet';
import { BaseWidget } from 'gridstack/dist/angular';
import { WeatherAlert } from './alert/weather-alert';
import { WeatherAlertWidgetService } from './weather-alert.service';
import { Widget } from '@cockpit/app/shared/widget/widget';
import { DashboardService } from '../dashboard.service';
import { WeatherAlertsDto } from './WeatherAlert.dto';

@Component({
	selector: 'app-weather-alert-widget',
	imports: [AsyncOutlet, MatCardModule, MatListModule, WeatherAlert],
	providers: [WeatherAlertWidgetService],
	template: `
		<mat-card>
			<mat-card-content>
				<ng-container *appAsyncOutlet="widgetDataService; let weatherData = data">
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
export class WeatherAlertWidget extends Widget {
	public readonly widgetDataService: WeatherAlertWidgetService = inject(WeatherAlertWidgetService);
	public readonly widgetControlService: DashboardService = inject(DashboardService);

	public refresh(): void {
		this.widgetDataService.load();
	}
}

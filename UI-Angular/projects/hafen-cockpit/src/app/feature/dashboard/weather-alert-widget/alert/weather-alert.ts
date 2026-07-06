import { DatePipe } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { WeatherAlertDto } from '../WeatherAlert.dto';

@Component({
	selector: 'app-weather-alert',
	imports: [MatCardModule, MatListModule],
	template: `
		@let alert = weatherAlert();
		@if (alert) {
			<mat-card>
				<mat-card-header>
					<mat-card-title>{{ alert.headline_de }}</mat-card-title>
				</mat-card-header>
				<mat-card-content>
					<p>{{ alert.description_de }}</p>
				</mat-card-content>
			</mat-card>
		}
	`,
	styles: `
		mat-card {
			box-shadow: none;
			border: 1px solid orange;
		}
	`,
})
export class WeatherAlert {
	public readonly weatherAlert: InputSignal<WeatherAlertDto | undefined> = input();
}

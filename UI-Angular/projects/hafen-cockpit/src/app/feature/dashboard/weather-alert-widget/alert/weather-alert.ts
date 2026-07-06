import { Component, input, InputSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { WeatherAlertDto, WeatherAlertLocationDto } from '../WeatherAlert.dto';

@Component({
	selector: 'app-weather-alert',
	imports: [MatCardModule, MatListModule],
	template: `
		@let alert = weatherAlert();
		@let location = alertLocation();
		<mat-card>
			<mat-card-header>
				<mat-card-title>{{ alert.headline_de }}</mat-card-title>
				@if (location) {
					<mat-card-subtitle>{{ location.name }}</mat-card-subtitle>
				}
			</mat-card-header>
			<mat-card-content>
				<p>{{ alert.description_de }}</p>
			</mat-card-content>
		</mat-card>
	`,
	styles: `
		mat-card {
			box-shadow: none;
			border: 1px solid orange;
		}
	`,
})
export class WeatherAlert {
	public readonly weatherAlert: InputSignal<WeatherAlertDto> = input.required();
	public readonly alertLocation: InputSignal<WeatherAlertLocationDto | null> = input.required();
}

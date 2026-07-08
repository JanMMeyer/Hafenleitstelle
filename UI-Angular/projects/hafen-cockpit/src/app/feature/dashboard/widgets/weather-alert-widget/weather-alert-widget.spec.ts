import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherAlertWidget } from './weather-alert-widget';

describe('WeatherAlertWidget', () => {
	let component: WeatherAlertWidget;
	let fixture: ComponentFixture<WeatherAlertWidget>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [WeatherWarningsWidget],
		}).compileComponents();

		fixture = TestBed.createComponent(WeatherAlertWidget);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

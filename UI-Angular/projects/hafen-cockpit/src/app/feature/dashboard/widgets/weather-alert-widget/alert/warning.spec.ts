import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherAlert } from './weather-alert';

describe('Warning', () => {
	let component: WeatherAlert;
	let fixture: ComponentFixture<WeatherAlert>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Warning],
		}).compileComponents();

		fixture = TestBed.createComponent(WeatherAlert);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

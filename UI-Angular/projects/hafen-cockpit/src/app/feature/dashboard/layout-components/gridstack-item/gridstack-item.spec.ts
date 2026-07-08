import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridstackItem } from './gridstack-item';

describe('GridstackItem', () => {
	let component: GridstackItem;
	let fixture: ComponentFixture<GridstackItem>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [GridstackItem],
		}).compileComponents();

		fixture = TestBed.createComponent(GridstackItem);
		component = fixture.componentInstance;
		await fixture.whenStable();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

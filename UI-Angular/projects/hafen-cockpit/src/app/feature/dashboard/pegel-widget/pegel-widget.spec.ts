import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PegelWidget } from './pegel-widget';

describe('PegelWidget', () => {
  let component: PegelWidget;
  let fixture: ComponentFixture<PegelWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PegelWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(PegelWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

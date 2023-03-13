import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Spied } from 'src/app/shared/tests/utils';
import { Dealer } from '../../models/dealer.model';

import { DealerCardComponent } from './dealer-card.component';

describe('DealerCardComponent', () => {
  let component: DealerCardComponent;
  let fixture: ComponentFixture<DealerCardComponent>;
  let sampleDealer: Dealer = {
    bac: '122345',
    name: 'Cadillac Detriot',
    city: 'Detriot',
    state: 'WV',
    country: 'US',
    brand: 'Cadillac',
  };
  let routerSpy: Spied<Router> = jasmine.createSpyObj('Router', [
    'navigateByUrl',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DealerCardComponent],
      providers: [
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DealerCardComponent);
    component = fixture.componentInstance;
    component.dealer = sampleDealer;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all properties', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    Object.values(sampleDealer).forEach((v) => {
      expect(compiled.textContent?.includes(v)).toBeTruthy();
    });
  });

  it('should trigger navigating with a button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    Object.values(sampleDealer).forEach((v) => {
      expect(compiled.textContent?.includes(v)).toBeTruthy();
    });
    const { debugElement } = fixture;
    const viewVehiclesButton = debugElement.query(
      By.css('[data-testid="view-dealer-vehicles-button"]')
    );
    expect(viewVehiclesButton).toBeTruthy();
    expect(routerSpy.navigateByUrl.calls.count()).toBe(0);
    viewVehiclesButton.triggerEventHandler('click', null);
    expect(routerSpy.navigateByUrl.calls.count()).toBe(1);
  });
});

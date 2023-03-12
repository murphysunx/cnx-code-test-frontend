import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { isEqual } from 'lodash';

import { of, throwError } from 'rxjs';
import { Dealer } from '../../models/dealer.model';
import { DealerService } from '../../services/dealer.service';

import { DealerDashboardComponent } from './dealer-dashboard.component';

import { Spied } from 'src/app/shared/tests/utils';

describe('DealerDashboardComponent', () => {
  let component: DealerDashboardComponent;
  let fixture: ComponentFixture<DealerDashboardComponent>;
  let dealerServiceSpy: Spied<DealerService>;
  const sampleDealers: Dealer[] = [
    {
      bac: '122345',
      name: 'Cadillac Detriot',
      city: 'Detriot',
      state: 'WV',
      country: 'US',
      brand: 'Cadillac',
    },
    {
      bac: '122346',
      name: 'Buick Detriot',
      city: 'Detriot',
      state: 'WV',
      country: 'US',
      brand: 'Buick',
    },
    {
      bac: '122347',
      name: 'GMC Detriot',
      city: 'Detriot',
      state: 'WV',
      country: 'US',
      brand: 'GMC',
    },
    {
      bac: '122348',
      name: 'Buick New York',
      city: 'New York',
      state: 'WV',
      country: 'US',
      brand: 'Buick',
    },
  ];

  beforeEach(async () => {
    dealerServiceSpy = jasmine.createSpyObj('DealerService', [
      'fetchAllDealers',
    ]);
    await TestBed.configureTestingModule({
      declarations: [DealerDashboardComponent],
      providers: [
        {
          provide: DealerService,
          useValue: dealerServiceSpy,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  it('should have correct init values', () => {
    fixture = TestBed.createComponent(DealerDashboardComponent);
    component = fixture.componentInstance;
    expect(component.error).toBeFalsy();
    expect(component.initalised).toBeFalsy();
    expect(component.dealers).toBeFalsy();
  });

  it('should create', () => {
    dealerServiceSpy.fetchAllDealers.and.returnValue(of(sampleDealers));
    fixture = TestBed.createComponent(DealerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call DealerService fetchAllDealers', () => {
    dealerServiceSpy.fetchAllDealers.and.returnValue(of(sampleDealers));
    fixture = TestBed.createComponent(DealerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(dealerServiceSpy.fetchAllDealers).toHaveBeenCalled();
  });

  it('should load no dealers', () => {
    dealerServiceSpy.fetchAllDealers.and.returnValue(of([]));
    fixture = TestBed.createComponent(DealerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.error).toBeFalsy();
    expect(component.initalised).toBeTruthy();
    expect(isEqual(component.dealers, [])).toBeTruthy();
  });

  it('should load correct dealers', () => {
    dealerServiceSpy.fetchAllDealers.and.returnValue(of(sampleDealers));
    fixture = TestBed.createComponent(DealerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.error)
      .withContext('no error after correctly loading')
      .toBeFalsy();
    expect(component.initalised)
      .withContext('init completed after loading')
      .toBeTruthy();
    expect(isEqual(component.dealers, sampleDealers))
      .withContext('load expected dealers')
      .toBeTruthy();
  });

  it('should have an error when the request fails', () => {
    dealerServiceSpy.fetchAllDealers.and.returnValue(
      throwError('Internal ServerError. Please try again')
    );
    fixture = TestBed.createComponent(DealerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.error).toBeTruthy();
    expect(component.initalised)
      .withContext('initialised even error')
      .toBeTruthy();
    expect(component.dealers).toBeFalsy();
  });

  it('should clear errors after reloading', () => {
    dealerServiceSpy.fetchAllDealers.and.returnValue(
      throwError('Internal ServerError. Please try again')
    );
    fixture = TestBed.createComponent(DealerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.error).toBeTruthy();
    expect(component.initalised).toBeTruthy();
    expect(component.dealers).toBeFalsy();
    dealerServiceSpy.fetchAllDealers.and.returnValue(of(sampleDealers));
    component.loadDealers();
    fixture.detectChanges();
    expect(component.error).toBeFalsy();
    expect(component.initalised).toBeTruthy();
    expect(component.dealers === sampleDealers).toBeTruthy();
  });
});

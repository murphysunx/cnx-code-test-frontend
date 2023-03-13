import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { isEqual } from 'lodash';
import { of, ReplaySubject, throwError } from 'rxjs';
import { Spied } from 'src/app/shared/tests/utils';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DealerVehicleComponent } from './dealer-vehicle.component';
import { By } from '@angular/platform-browser';

describe('DealerVehicleComponent', () => {
  let component: DealerVehicleComponent;
  let fixture: ComponentFixture<DealerVehicleComponent>;
  let vehicleService: Spied<VehicleService>;
  let route: Spied<ActivatedRoute>;

  let sampleBac = '122345';
  let sampleVehicleMapByBac: Record<string, Vehicle[]> = {
    122345: [
      {
        _id: '5ba47ea11e867b8c0ac40c9d',
        bac: '122345',
        vin: 'VIN00000000000000',
        ctpStatus: 'IN-SERVICE',
        onstarStatus: 'ONS-116',
        events: [
          {
            _id: '5ba47ea11e867b8c0ac40c9e',
            eventDate: '2018-09-19T14:00:00.000+0000',
            eventType: 'created',
          },
        ],
        createdAt: '2018-09-21T05:16:17.927+0000',
        updatedAt: '2018-10-09T02:50:29.624+0000',
        make: 'Cadillac',
        model: 'T',
        telemetryPnid: '67890',
        color: 'Black',
        stockNumber: '12345',
        year: 2018,
      },
      {
        _id: '5ba47ea11e867b8c0ac40c99',
        bac: '122345',
        vin: 'VIN00000000000001',
        ctpStatus: 'IN-SERVICE',
        onstarStatus: 'CONNECTED',
        events: [
          {
            _id: '5ba47ea11e867b8c0ac40c9e',
            eventDate: '2018-09-19T14:00:00.000+0000',
            eventType: 'created',
          },
        ],
        createdAt: '2018-09-21T05:16:17.927+0000',
        updatedAt: '2018-10-09T02:50:29.624+0000',
        make: 'Cadillac',
        model: 'T',
        telemetryPnid: '67890',
        color: 'Black',
        stockNumber: '12346',
        year: 2018,
      },
      {
        _id: '5ba47ea11e867b8c0ac40c90',
        bac: '122345',
        vin: 'VIN00000000000002',
        ctpStatus: 'IN-SERVICE',
        onstarStatus: 'CONNECTED',
        events: [
          {
            _id: '5ba47ea11e867b8c0ac40c9e',
            eventDate: '2018-09-19T14:00:00.000+0000',
            eventType: 'created',
          },
        ],
        createdAt: '2018-09-21T05:16:17.927+0000',
        updatedAt: '2018-10-09T02:50:29.624+0000',
        make: 'Cadillac',
        model: 'T',
        telemetryPnid: '67890',
        color: 'Red',
        stockNumber: '12347',
        year: 2018,
      },
    ],
  };

  beforeEach(async () => {
    vehicleService = jasmine.createSpyObj('VehicleService', [
      'getVehiclesByBac',
    ]);
    route = jasmine.createSpyObj(
      'ActivatedRoute',
      {},
      {
        params: of({ bac: sampleBac }),
      }
    );

    await TestBed.configureTestingModule({
      declarations: [DealerVehicleComponent],
      providers: [
        {
          provide: VehicleService,
          useValue: vehicleService,
        },
        {
          provide: ActivatedRoute,
          useValue: route,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DealerVehicleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    vehicleService.getVehiclesByBac.and.returnValue(of([]));
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    expect(component.initalised).toBeFalsy();
    vehicleService.getVehiclesByBac.and.returnValue(of(sampleVehicleMapByBac));
    fixture.detectChanges();
    expect(component.initalised).toBeTruthy();
  });

  it('should have error', () => {
    expect(component.error).toBeFalsy();
    vehicleService.getVehiclesByBac.and.returnValue(throwError('fail'));
    fixture.detectChanges();
    expect(component.error).toBeTruthy();
  });

  it('should call vehicle service', () => {
    fixture.detectChanges();
    vehicleService.getVehiclesByBac.and.returnValue(of(sampleVehicleMapByBac));
    expect(vehicleService.getVehiclesByBac.calls.count()).toBe(1);
  });

  it('should load no vehicles', () => {
    vehicleService.getVehiclesByBac.and.returnValue(of([]));
    fixture.detectChanges();
    expect(component.bac).toBe(sampleBac);
    expect(component.vehicles?.length).toBe(0);
  });

  it('should load correct vehicles', () => {
    vehicleService.getVehiclesByBac.and.returnValue(
      of(sampleVehicleMapByBac[sampleBac])
    );
    fixture.detectChanges();
    expect(component.bac).toBe(sampleBac);
    expect(
      isEqual(component.vehicles, sampleVehicleMapByBac[sampleBac])
    ).toBeTruthy();
  });

  it('should listen to route bac changes', () => {
    const paramsSubject = new ReplaySubject();
    (
      Object.getOwnPropertyDescriptor(route, 'params') as any
    ).get.and.returnValue(paramsSubject);
    paramsSubject.next({ bac: '122' });
    vehicleService.getVehiclesByBac.and.returnValue(of([]));
    fixture.detectChanges();
    expect(component.bac).toBe('122');
    expect(component.vehicles!.length).toBe(0);
    vehicleService.getVehiclesByBac.and.returnValue(
      of(sampleVehicleMapByBac[sampleBac])
    );
    expect(vehicleService.getVehiclesByBac.calls.count()).toBe(1);
    paramsSubject.next({ bac: sampleBac });
    fixture.detectChanges();
    expect(component.bac).toBe(sampleBac);
    expect(vehicleService.getVehiclesByBac.calls.count()).toBe(2);
    expect(
      isEqual(component.vehicles, sampleVehicleMapByBac[sampleBac])
    ).toBeTruthy();
  });

  it('should show reload button when errors', () => {
    vehicleService.getVehiclesByBac.and.returnValue(throwError('fail'));
    fixture.detectChanges();
    expect(component.bac).toBe(sampleBac);
    expect(vehicleService.getVehiclesByBac.calls.count()).toBe(1);
    expect(component.error).toBeTruthy();
    const { debugElement } = fixture;
    const reloadDealerVehiclesButton = debugElement.query(
      By.css('[data-testid="reload-dealer-vehicles-button"]')
    );
    expect(reloadDealerVehiclesButton).toBeTruthy();
    vehicleService.getVehiclesByBac.and.returnValue(
      of(sampleVehicleMapByBac[sampleBac])
    );
    reloadDealerVehiclesButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(vehicleService.getVehiclesByBac.calls.count()).toBe(2);
    expect(component.error).toBeFalsy();
  });
});

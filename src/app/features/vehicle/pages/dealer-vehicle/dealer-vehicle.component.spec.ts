import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';

import { DealerVehicleComponent } from './dealer-vehicle.component';

describe('DealerVehicleComponent', () => {
  let component: DealerVehicleComponent;
  let fixture: ComponentFixture<DealerVehicleComponent>;
  let vehicleService: VehicleService;
  let route: ActivatedRoute;

  let vehicleSource = new Subject<Vehicle[]>();
  let routeParamsSource = new Subject<{ bac: string }>();

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
    vehicleService = jasmine.createSpyObj('VehicleService', {
      getVehiclesByBac: vehicleSource.asObservable(),
    });
    route = jasmine.createSpyObj(
      'ActivatedRoute',
      {},
      {
        params: routeParamsSource.asObservable(),
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
          useValue: route.params,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DealerVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read route params', () => {
    expect(route.params).toHaveBeenCalled();
  });

  it('should call vehicle service', () => {
    expect(vehicleService.getVehiclesByBac).toHaveBeenCalled();
  });

  it('should call vehicle service after reading route params', () => {
    expect(route.params).toHaveBeenCalledBefore(
      vehicleService.getVehiclesByBac
    );
  });

  it('should load no vehicles', () => {
    const bacVehicles: Vehicle[] = [];
    routeParamsSource.next({
      bac: sampleBac,
    });
    vehicleSource.next(bacVehicles);
    fixture.detectChanges();
    expect(component.bac).toBe(sampleBac);
    expect(component.vehicles?.length).toBe(0);
  });

  it('should load correct vehicles', () => {
    routeParamsSource.next({
      bac: sampleBac,
    });
    vehicleSource.next(sampleVehicleMapByBac[sampleBac]);
    fixture.detectChanges();
    expect(component.bac).toBe(sampleBac);
    expect(component.vehicles).toBe(sampleVehicleMapByBac[sampleBac]);
  });

  it('should listen to route bac changes', () => {
    const bacVehicles: Vehicle[] = [];
    routeParamsSource.next({
      bac: sampleBac,
    });
    vehicleSource.next(bacVehicles);
    fixture.detectChanges();
    expect(component.bac).toBe(sampleBac);
    expect(component.vehicles?.length).toBe(0);
    routeParamsSource.next({
      bac: sampleBac,
    });
    vehicleSource.next(sampleVehicleMapByBac[sampleBac]);
    fixture.detectChanges();
    expect(component.bac).toBe(sampleBac);
    expect(component.vehicles).toBe(sampleVehicleMapByBac[sampleBac]);
  });
});

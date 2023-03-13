import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Vehicle } from '../../models/vehicle.model';

import { VehicleDeatilComponent } from './vehicle-deatil.component';

fdescribe('VehicleDeatilComponent', () => {
  let component: VehicleDeatilComponent;
  let fixture: ComponentFixture<VehicleDeatilComponent>;
  let sampleVehicle: Vehicle = {
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
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleDeatilComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleDeatilComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.vehicle = sampleVehicle;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should include fields', () => {
    component.vehicle = sampleVehicle;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent?.includes(sampleVehicle.bac)).toBeTruthy();
    expect(compiled.textContent?.includes(sampleVehicle.vin)).toBeTruthy();
    expect(
      compiled.textContent?.includes(sampleVehicle.ctpStatus)
    ).toBeTruthy();
    expect(
      compiled.textContent?.includes(sampleVehicle.onstarStatus)
    ).toBeTruthy();
    expect(
      compiled.textContent?.includes(sampleVehicle.createdAt)
    ).toBeTruthy();
    expect(compiled.textContent?.includes(sampleVehicle.color)).toBeTruthy();
    expect(
      compiled.textContent?.includes(sampleVehicle.stockNumber)
    ).toBeTruthy();
    expect(
      compiled.textContent?.includes(sampleVehicle.year.toString())
    ).toBeTruthy();
  });
});

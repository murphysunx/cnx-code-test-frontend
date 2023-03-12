import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerListComponent } from './dealer-list.component';

describe('DealerListComponent', () => {
  let component: DealerListComponent;
  let fixture: ComponentFixture<DealerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DealerListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DealerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no .dealer-list__item when no dealers', () => {
    component.dealers = [];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelectorAll('.dealer-list__item').length === 0
    ).toBeTruthy();
  });

  it('length of item with .dealer-list__item should equal to the length of dealers', () => {
    const sampleDealers = [
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
    component.dealers = sampleDealers;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelectorAll('.dealer-list__item').length ===
        sampleDealers.length
    ).toBeTruthy();
  });
});

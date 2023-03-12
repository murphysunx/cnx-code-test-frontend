import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DealerCardComponent],
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
});

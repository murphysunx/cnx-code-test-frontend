import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DealerService } from '../../services/dealer.service';

import { DealerDashboardComponent } from './dealer-dashboard.component';

describe('DashboardComponent', () => {
  let component: DealerDashboardComponent;
  let fixture: ComponentFixture<DealerDashboardComponent>;
  let dealerServiceSpy: DealerService;

  beforeEach(async () => {
    dealerServiceSpy = jasmine.createSpyObj('DealerService', {
      fetchAllDealers: of([]),
    });
    await TestBed.configureTestingModule({
      declarations: [DealerDashboardComponent],
      providers: [
        {
          provide: DealerService,
          useValue: dealerServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DealerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call DealerService fetchAllDealers', () => {
    expect(dealerServiceSpy.fetchAllDealers).toHaveBeenCalled();
  });
});

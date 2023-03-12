import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Dealer } from '../../models/dealer.model';
import { DealerService } from '../../services/dealer.service';

@Component({
  selector: 'app-dealer-dashboard',
  templateUrl: './dealer-dashboard.component.html',
  styleUrls: ['./dealer-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealerDashboardComponent implements OnInit {
  private init = false;
  private err?: string;

  dealers?: Dealer[];

  constructor(
    private cd: ChangeDetectorRef,
    private dealerService: DealerService
  ) {}

  loadDealers(): void {
    this.init = false;
    this.dealerService.fetchAllDealers().subscribe({
      next: (dealers) => {
        this.dealers = dealers;
        this.init = true;
        this.cd.detectChanges();
      },
      error: (err) => {
        this.init = true;
        this.err = err;
        console.log('error while loading all dealers', err);
        this.cd.detectChanges();
      },
    });
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.loadDealers();
  }

  get initalised(): boolean {
    return this.init;
  }

  get error(): string | undefined {
    return this.err;
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subject, Subscription, switchMap, takeUntil, tap } from 'rxjs';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-dealer-vehicle',
  templateUrl: './dealer-vehicle.component.html',
  styleUrls: ['./dealer-vehicle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealerVehicleComponent implements OnInit, OnDestroy {
  private init = false;
  private err?: string;
  private destroy$ = new Subject<void>();
  private loadSubscription?: Subscription;

  bac!: string;
  vehicles?: Vehicle[];

  constructor(
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private vehicleService: VehicleService
  ) {}

  loadDealerVehicles(): void {
    this.init = false;
    this.err = void 0;
    if (this.loadSubscription) {
      this.loadSubscription.unsubscribe();
      this.loadSubscription = void 0;
    }
    this.loadSubscription = this.route.params
      .pipe(
        map((params) => params['bac']),
        tap((bac) => {
          this.bac = bac;
        }),
        switchMap((bac) => this.vehicleService.getVehiclesByBac(bac)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (vehicles) => {
          this.vehicles = vehicles;
          this.init = true;
          this.cd.detectChanges();
        },
        error: (err) => {
          this.init = true;
          this.err = err;
          console.error(err);
          this.cd.detectChanges();
        },
      });
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.loadDealerVehicles();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get initalised(): boolean {
    return this.init;
  }

  get error(): string | undefined {
    return this.err;
  }
}

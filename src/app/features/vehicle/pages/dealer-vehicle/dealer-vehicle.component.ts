import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, tap } from 'rxjs';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-dealer-vehicle',
  templateUrl: './dealer-vehicle.component.html',
  styleUrls: ['./dealer-vehicle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealerVehicleComponent implements OnInit {
  private init = false;

  bac!: string;
  vehicles?: Vehicle[];

  constructor(
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => params['bac']),
        tap((bac) => {
          this.init = false;
          this.bac = bac;
        }),
        switchMap((bac) => this.vehicleService.getVehiclesByBac(bac))
      )
      .subscribe({
        next: (vehicles) => {
          this.vehicles = vehicles;
          this.init = true;
          this.cd.detectChanges();
        },
        error: (err) => {
          this.init = true;
          console.error(err);
        },
      });
  }

  get initalised(): boolean {
    return this.init;
  }
}

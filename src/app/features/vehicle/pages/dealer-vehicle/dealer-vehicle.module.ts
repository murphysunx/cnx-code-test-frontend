import { NgModule } from '@angular/core';
import { VehicleDetailModule } from '../../components/vehicle-deatil/vehicle-detail.module';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { DealerVehicleComponent } from './dealer-vehicle.component';

@NgModule({
  imports: [CommonModule, VehicleDetailModule, MatListModule, MatButtonModule],
  exports: [DealerVehicleComponent],
  declarations: [DealerVehicleComponent],
})
export class DealerVehicleModule {}

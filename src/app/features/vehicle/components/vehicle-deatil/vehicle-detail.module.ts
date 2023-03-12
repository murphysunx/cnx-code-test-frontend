import { NgModule } from '@angular/core';

import { VehicleDeatilComponent } from './vehicle-deatil.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, MatCardModule],
  exports: [VehicleDeatilComponent],
  declarations: [VehicleDeatilComponent],
  providers: [],
})
export class VehicleDetailModule {}

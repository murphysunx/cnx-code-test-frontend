import { NgModule } from '@angular/core';
import { DealerVehicleModule } from './pages/dealer-vehicle/dealer-vehicle.module';
import { VehicleRoutingModule } from './vehicle-routing.module';

@NgModule({
  imports: [VehicleRoutingModule, DealerVehicleModule],
  exports: [],
  declarations: [],
  providers: [],
})
export class VehicleModule {}

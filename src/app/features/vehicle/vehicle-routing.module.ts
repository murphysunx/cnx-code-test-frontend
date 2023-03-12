import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealerVehicleComponent } from './pages/dealer-vehicle/dealer-vehicle.component';

const vehicleRoutes: Routes = [
  {
    path: ':bac',
    component: DealerVehicleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(vehicleRoutes)],
  exports: [],
  declarations: [],
  providers: [],
})
export class VehicleRoutingModule {}

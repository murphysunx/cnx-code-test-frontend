import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dealer/dealer.module').then((m) => m.DealerModule),
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./features/vehicle/vehicle.module').then((m) => m.VehicleModule),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

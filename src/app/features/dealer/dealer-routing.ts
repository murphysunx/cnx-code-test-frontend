import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DealerDashboardComponent } from './pages/dealer-dashboard/dealer-dashboard.component';

const dealerRoutes: Routes = [
  {
    path: '',
    component: DealerDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(dealerRoutes)],
  exports: [],
  declarations: [],
  providers: [],
})
export class DealerRoutingModule {}

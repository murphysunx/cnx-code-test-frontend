import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealerRoutingModule } from './dealer-routing';
import { DealerDashboardModule } from './pages/dealer-dashboard/dealer-dashboard.module';

@NgModule({
  imports: [CommonModule, DealerRoutingModule, DealerDashboardModule],
})
export class DealerModule {}

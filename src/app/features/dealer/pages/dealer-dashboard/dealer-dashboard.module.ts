import { NgModule } from '@angular/core';
import { DealerListModule } from '../../components/dealer-list/dealer-list.module';

import { DealerDashboardComponent } from './dealer-dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, DealerListModule, MatButtonModule],
  exports: [],
  declarations: [DealerDashboardComponent],
})
export class DealerDashboardModule {}

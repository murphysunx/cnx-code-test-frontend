import { NgModule } from '@angular/core';
import { DealerListModule } from '../../components/dealer-list/dealer-list.module';

import { DealerDashboardComponent } from './dealer-dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { LoadingPageModule } from 'src/app/shared/components/loading-page/loading-page.module';

@NgModule({
  imports: [CommonModule, DealerListModule, MatButtonModule, LoadingPageModule],
  exports: [],
  declarations: [DealerDashboardComponent],
})
export class DealerDashboardModule {}

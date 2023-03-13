import { NgModule } from '@angular/core';

import { LoadingPageComponent } from './loading-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [MatProgressSpinnerModule],
  exports: [LoadingPageComponent],
  declarations: [LoadingPageComponent],
  providers: [],
})
export class LoadingPageModule {}

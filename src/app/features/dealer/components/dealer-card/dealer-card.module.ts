import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DealerCardComponent } from './dealer-card.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, MatCardModule, MatButtonModule],
  exports: [DealerCardComponent],
  declarations: [DealerCardComponent],
  providers: [],
})
export class DealerCardModule {}

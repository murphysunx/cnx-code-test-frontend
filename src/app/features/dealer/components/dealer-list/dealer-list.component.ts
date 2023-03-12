import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Dealer } from '../../models/dealer.model';

@Component({
  selector: 'app-dealer-list',
  templateUrl: './dealer-list.component.html',
  styleUrls: ['./dealer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealerListComponent {
  @Input() dealers?: Dealer[];
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Vehicle } from '../../models/vehicle.model';

@Component({
  selector: 'app-vehicle-deatil',
  templateUrl: './vehicle-deatil.component.html',
  styleUrls: ['./vehicle-deatil.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehicleDeatilComponent {
  @Input() vehicle!: Vehicle;
}

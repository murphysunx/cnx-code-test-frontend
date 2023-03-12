import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  getVehiclesByBac(bac: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`http://localhost:3000/vehicles/${bac}`);
  }
}

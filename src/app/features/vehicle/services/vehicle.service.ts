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
    return this.http.get<Vehicle[]>(
      `https://ud9fscxo84.execute-api.us-east-1.amazonaws.com/latest/vehicles/${bac}`
    );
  }
}

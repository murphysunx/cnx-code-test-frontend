import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dealer } from '../models/dealer.model';

@Injectable({
  providedIn: 'root',
})
export class DealerService {
  constructor(private http: HttpClient) {}

  fetchAllDealers(): Observable<Dealer[]> {
    return this.http.get<Dealer[]>(
      'https://ud9fscxo84.execute-api.us-east-1.amazonaws.com/latest/dealers'
    );
  }
}

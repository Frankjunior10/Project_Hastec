import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SaleService {
  private apiUrl = 'http://localhost:8080/api/sales'; // ajusta si es necesario

  constructor(private http: HttpClient) {}

  getSaleReceipt(saleId: number) {
    return this.http.get<any>(`${this.apiUrl}/receipt/${saleId}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaleRequest } from '../models/SaleRequest';
import { SaleResponse } from '../models/SaleResponse';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SaleService {
  private apiUrl = 'http://localhost:8080/api/sales'; // ajusta si es necesario

  private ruta_servidor: string = "http://localhost:8080/api";
  private recurso: string = "sales";

  constructor(private http: HttpClient) {}

  getSaleReceipt(saleId: number) {
    return this.http.get<any>(`${this.apiUrl}/receipt/${saleId}`);
  }

    // Crear una nueva venta
    createSale(saleRequest: SaleRequest): Observable<SaleResponse> {
      return this.http.post<SaleResponse>(`${this.ruta_servidor}/${this.recurso}`, saleRequest);
    }

    // Obtener todas las ventas
    getSales(): Observable<SaleResponse[]> {
      return this.http.get<SaleResponse[]>(`${this.ruta_servidor}/${this.recurso}`);
    }

    // Obtener una venta por ID
    getSale(id: number): Observable<SaleResponse> {
      return this.http.get<SaleResponse>(`${this.ruta_servidor}/${this.recurso}/${id}`);
    }
}

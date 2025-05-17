// sale.service.ts (servicio para ventas)

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SaleRequest } from '../models/SaleRequest';
import { SaleResponse } from '../models/SaleResponse';
import { Observable } from 'rxjs';
import { DTOSaleDetails } from '../models/DTOSaleDetails';

@Injectable({ providedIn: 'root' })
export class SaleService {
  // Cambia aquí la URL al backend correcto con puerto
  private baseUrl = 'http://localhost:8080/api/sales';

  constructor(private http: HttpClient) {}

  // Crear una nueva venta
  createSale(saleRequest: SaleRequest): Observable<SaleResponse> {
    return this.http.post<SaleResponse>(this.baseUrl, saleRequest);
  }

  // Obtener recibo de venta
  getSaleReceipt(saleId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/receipt/${saleId}`);
  }

  // Obtener todas las ventas
  getSales(): Observable<SaleResponse[]> {
    return this.http.get<SaleResponse[]>(this.baseUrl);
  }

  // Obtener una venta por ID
  getSale(id: number): Observable<SaleResponse> {
    return this.http.get<SaleResponse>(`${this.baseUrl}/${id}`);
  }

  // Obtener reporte de ventas entre dos fechas
  getSalesReportByDateRange(startDate: string, endDate: string): Observable<DTOSaleDetails[]> {
    return this.http.get<DTOSaleDetails[]>(`${this.baseUrl}/reporte`, {
      params: {
        fechaInicio: startDate,
        fechaFin: endDate
      }
    });
  }
}

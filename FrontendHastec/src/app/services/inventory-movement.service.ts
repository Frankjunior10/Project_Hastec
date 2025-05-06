import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InventoryMovement } from '../models/InventoryMovement';

@Injectable({
  providedIn: 'root'
})
export class InventoryMovementService {

  private ruta_servidor: string = "http://localhost:8080/api";
  private recurso: string = "inventory-movements";

  constructor(private http: HttpClient) { }

  // Obtener todos los movimientos de inventario
  getInventoryMovements(): Observable<InventoryMovement[]> {
    return this.http.get<InventoryMovement[]>(`${this.ruta_servidor}/${this.recurso}`);
  }

  // Obtener un movimiento de inventario por ID
  getInventoryMovement(id: number): Observable<InventoryMovement> {
    return this.http.get<InventoryMovement>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }

  // Crear un nuevo movimiento de inventario
  createInventoryMovement(movement: InventoryMovement): Observable<InventoryMovement> {
    return this.http.post<InventoryMovement>(`${this.ruta_servidor}/${this.recurso}`, movement);
  }

  // Eliminar un movimiento de inventario
  deleteInventoryMovement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }
}

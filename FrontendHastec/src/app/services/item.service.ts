import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private ruta_servidor: string = "http://localhost:8080/api";
  private recurso: string = "items";

  constructor(private http: HttpClient) { }

  // Obtener todos los items
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.ruta_servidor}/${this.recurso}`);
  }

  // Obtener un item por su ID
  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }

  // Crear un nuevo item
  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.ruta_servidor}/${this.recurso}`, item);
  }

  // Actualizar un item existente
  updateItem(id: number, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.ruta_servidor}/${this.recurso}/${id}`, item);
  }

  // Eliminar un item
  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ruta_servidor}/${this.recurso}/${id}`);
  }
}

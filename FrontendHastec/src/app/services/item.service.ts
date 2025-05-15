import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ItemRequestDTO } from '../models/ItemRequestDTO';
import { Item } from '../models/Item';
import { Sede } from '../models/sede';

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
  createItem(item: ItemRequestDTO): Observable<Item> {
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

  // Subir imagen de un item

  uploadItemImage(id: number, imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.http.post(`${this.ruta_servidor}/${this.recurso}/upload-image/${id}`, formData);
  }

  // Obtener items filtrados por sede
  getItemsBySede(sedeId: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.ruta_servidor}/${this.recurso}?sedeId=${sedeId}`);
  }

    // Método para obtener todas las sedes
    getSedes(): Observable<Sede[]> {
      return this.http.get<Sede[]>(`${this.ruta_servidor}/${this.recurso}`);
    }


}

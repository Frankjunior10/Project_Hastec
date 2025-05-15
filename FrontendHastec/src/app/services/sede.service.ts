import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item, Sede } from '../models/Item';

@Injectable({
  providedIn: 'root'
})
export class SedeService {
  private ruta_servidor: string = "http://localhost:8080/api"; // Ajusta según tu configuración
  private recurso: string = "sedes"; // Asegúrate de que la ruta sea la correcta

  constructor(private http: HttpClient) {}

  // Obtener todas las sedes
  getAll(): Observable<Sede[]> {
    return this.http.get<Sede[]>(`${this.ruta_servidor}/${this.recurso}`);
  }

  // Obtener items por sede
  getItemsBySede(sedeId: number): Observable<Item[]> {
  return this.http.get<Item[]>(`${this.ruta_servidor}/${this.recurso}/sede/${sedeId}`);
  }

    // Método para obtener todas las sedes
    getSedes(): Observable<Sede[]> {
      return this.http.get<Sede[]>(`${this.ruta_servidor}/${this.recurso}`);
    }
}

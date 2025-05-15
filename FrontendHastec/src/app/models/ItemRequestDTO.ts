// src/app/models/item-request.dto.ts
import { Category } from './Item'; // O donde tengas definido Category

export interface ItemRequestDTO {
  name: string;
  description: string;
  stock: number;
  price: number;
  lowStockThreshold: number;
  createdAt: string;
  imageUrl: string;
  code: string;
  brand: string;
  color: string;
  proveedor: string;
  ubicacion: string;
  estado: string;
  esActivo: boolean;
  sede: {
    id: number;
  };
  category: {
    id: number;
  };
}

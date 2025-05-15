
export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
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
  category: Category;
  sede?: Sede;
  sedeId?: number; // para formularios
}


export interface Category {
  id: number;
  name: string;
}

export interface Sede{
  id: number;
  nombre: string;
  direccion: string;
}

interface ItemConDescripcion extends Item {
  expandirDescripcion?: boolean;
}


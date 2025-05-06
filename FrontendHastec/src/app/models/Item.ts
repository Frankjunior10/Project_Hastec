export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  category: Category; // Cambiado de categoryId a category
}

export interface Category {
  id: number;
  name: string;
}

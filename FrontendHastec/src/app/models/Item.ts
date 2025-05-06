export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  lowStockThreshold: number;
  categoryId: number;  // O puedes usar un objeto completo si prefieres
}

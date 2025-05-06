export interface InventoryMovement {
  id: number;
  type: string;  // Ejemplo: 'Entrada' o 'Salida'
  date: string;
  itemMovements: ItemMovement[];
}

export interface ItemMovement {
  itemId: number;
  quantity: number;
  price: number;
  subtotal: number;
}

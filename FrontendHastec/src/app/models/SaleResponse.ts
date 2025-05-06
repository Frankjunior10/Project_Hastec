export interface SaleResponse {
  id: number;
  customerId: number;
  total: number;
  date: string;
  items: SaleItem[];
}

export interface SaleItem {
  itemId: number;
  quantity: number;
  price: number;
  subtotal: number;
}

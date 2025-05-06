export interface SaleRequest {
  customerId: number;
  items: SaleItem[];
}

export interface SaleItem {
  itemId: number;
  quantity: number;
}

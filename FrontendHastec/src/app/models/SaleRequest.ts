// models/SaleRequest.ts
export interface SaleRequest {
  customerId: number;
  items: {
    itemId: number;
    quantity: number;
  }[];
}

export interface SaleItem {
  itemId: number;
  quantity: number;
}

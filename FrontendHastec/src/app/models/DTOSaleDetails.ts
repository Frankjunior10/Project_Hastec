export interface DTOSaleDetails {
  saleId: number;
  date: string;
  total: number;
  status: string;
  customer: {
    id: number;
    name: string;
    phone: string;
  };
  items: {
    itemId: number;
    itemName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }[];
}

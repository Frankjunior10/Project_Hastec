import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.vfs;

@Component({
  selector: 'app-sale-receipt',
  templateUrl: './sale-receipt.component.html',
  styleUrl: './sale-receipt.component.css',
  template: `<button (click)="generateReceipt(1)">Generar Boleta</button>`,
})
export class SaleReceiptComponent {

  constructor(private http: HttpClient) {}

  generateReceipt(saleId: number) {
    this.http.get<any>(`http://localhost:8080/api/sales/receipt/${saleId}`).subscribe(receipt => {
      const docDefinition: any = {
        content: [
          { text: 'HASTEC INGENIERÍA', style: 'header' },
          { text: 'BOLETA DE VENTA', style: 'subheader' },
          {
            columns: [
              { text: `Fecha: ${new Date(receipt.date).toLocaleString()}`, alignment: 'left' },
              { text: `Cliente: ${receipt.customerName}`, alignment: 'right' }
            ],
            margin: [0, 0, 0, 5]
          },
          { text: `Teléfono: ${receipt.customerPhone}`, margin: [0, 0, 0, 10] },
          {
            table: {
              headerRows: 1,
              widths: ['*', 'auto', 'auto', 'auto'],
              body: [
                [
                  { text: 'Producto', bold: true },
                  { text: 'Cantidad', bold: true },
                  { text: 'P. Unitario', bold: true },
                  { text: 'Subtotal', bold: true }
                ],
                ...receipt.items.map((item: any) => [
                  item.itemName,
                  item.quantity,
                  `S/ ${item.unitPrice.toFixed(2)}`,
                  `S/ ${item.subtotal.toFixed(2)}`
                ])
              ]
            },
            layout: 'lightHorizontalLines',
            margin: [0, 0, 0, 10]
          },
          { text: `Total: S/ ${receipt.total.toFixed(2)}`, style: 'total' }
        ],
        styles: {
          header: {
            fontSize: 20,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 5]
          },
          subheader: {
            fontSize: 14,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10]
          },
          total: {
            fontSize: 14,
            bold: true,
            alignment: 'right',
            margin: [0, 10, 0, 0]
          }
        }
      };
      pdfMake.createPdf(docDefinition).open();
    }, error => {
      console.error('Error al generar boleta:', error);
      alert('No se pudo generar la boleta. Verifique si la venta existe.');
    });
  }
}

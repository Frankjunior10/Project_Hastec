import { Component } from '@angular/core';
import { DTOSaleDetails } from '../../models/DTOSaleDetails';
import { SaleService } from '../../services/sale.service';
import { Customer } from '../../models/customer';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddCustomerDialogComponent } from '../add-customer-dialog/add-customer-dialog.component';
import { CustomSnackbarComponent } from '../../shared/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent {
  displayedColumns: string[] = ['name', 'documentNumber', 'address', 'phone', 'acciones'];
  customers: Customer[] = [];

  // NUEVO: reporte ventas
  startDate: Date | null = null;
  endDate: Date | null = null;
  salesReport: DTOSaleDetails[] = [];
  loadingReport = false;
  errorReport = '';
  totalAcumulado: number = 0;
  displayedColumnsReport = ['itemName', 'quantity', 'unitPrice', 'subtotal'];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    this.customers = [
      { id: 1, name: 'Juan Pérez', documentNumber: '12345678', address: 'Calle Falsa 123', phone: '999888777' },
      { id: 2, name: 'Ana Gómez', documentNumber: '87654321', address: 'Av. Siempre Viva 742', phone: '988776655' }
    ];
  }

  editarCliente(cliente: Customer): void {
    console.log('Editar cliente:', cliente);
  }

  eliminarCliente(cliente: Customer): void {
    this.customers = this.customers.filter(c => c.id !== cliente.id);
  }

  loadSalesReport(): void {
    if (!this.startDate || !this.endDate) {
      this.errorReport = 'Por favor selecciona ambas fechas';
      this.salesReport = [];
      this.totalAcumulado = 0;
      return;
    }

    const start = this.startDate.toISOString().split('T')[0];
    const end = this.endDate.toISOString().split('T')[0];

    this.loadingReport = true;
    this.errorReport = '';

    this.saleService.getSalesReportByDateRange(start, end).subscribe({
      next: (data) => {
        this.salesReport = data;
        this.totalAcumulado = this.salesReport.reduce((sum, sale) => sum + this.getTotalPorVenta(sale), 0);
        this.loadingReport = false;
      },
      error: () => {
        this.errorReport = 'Error cargando el reporte';
        this.salesReport = [];
        this.totalAcumulado = 0;
        this.loadingReport = false;
      }
    });
  }

  getTotalPorVenta(sale: DTOSaleDetails): number {
    return sale.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }
}

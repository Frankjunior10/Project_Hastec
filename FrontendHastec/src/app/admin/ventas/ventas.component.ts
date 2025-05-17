// ventas.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, startWith } from 'rxjs';
import { AddCustomerDialogComponent } from '../add-customer-dialog/add-customer-dialog.component';
import { CustomSnackbarComponent } from '../../shared/custom-snackbar/custom-snackbar.component';
import { CustomerService } from '../../services/customer.service';
import { ItemService } from '../../services/item.service';
import { SaleService } from '../../services/sale.service';
import { Customer } from '../../models/customer';
import { Item } from '../../models/Item';
import { SaleRequest } from '../../models/SaleRequest';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  customers: Customer[] = [];
  items: Item[] = [];
  filteredItems: Observable<Item[]> | undefined;
  itemSearchControl = new FormControl('');
  selectedItems: { item: Item; quantity: number }[] = [];

  saleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private customerService: CustomerService,
    private itemService: ItemService,
    private saleService: SaleService
  ) {
    this.saleForm = this.fb.group({
      customerId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadItems();
  }

  loadCustomers(): void {
    this.customerService.getAll().subscribe({
      next: (data) => (this.customers = data),
      error: (err) => console.error('Error cargando clientes', err),
    });
  }

  loadItems(): void {
    this.itemService.getItems().subscribe({
      next: (data) => {
        this.items = data;
        this.filteredItems = this.itemSearchControl.valueChanges.pipe(
          startWith(''),
          map((value) =>
            typeof value === 'string' ? this._filterItems(value) : []
          )
        );
      },
      error: (err) => console.error('Error cargando items', err),
    });
  }

  private _filterItems(value: string): Item[] {
    const filterValue = value.toLowerCase();
    return this.items.filter(
      (item) =>
        item.name.toLowerCase().includes(filterValue) &&
        !this.isItemAlreadyAdded(item.id)
    );
  }

  isItemAlreadyAdded(itemId: number): boolean {
    return this.selectedItems.some((i) => i.item.id === itemId);
  }

  addItem(item: Item): void {
    if (!this.isItemAlreadyAdded(item.id)) {
      this.selectedItems.push({ item, quantity: 1 });
      this.itemSearchControl.setValue('');
    }
  }

  removeItem(index: number): void {
    this.selectedItems.splice(index, 1);
  }

  openAddCustomerDialog(): void {
    const dialogRef = this.dialog.open(AddCustomerDialogComponent, {
      width: '500px',
      maxHeight: '90vh',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((newCustomer) => {
      if (newCustomer) {
        this.customers.push(newCustomer);
        this.saleForm.patchValue({ customerId: newCustomer.id });
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: 'Cliente registrado exitosamente',
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar-panel'],
        });
      }
    });
  }

  submitSale(): void {
    if (this.saleForm.invalid || this.selectedItems.length === 0) {
      this.saleForm.markAllAsTouched();
      return;
    }

    const saleRequest: SaleRequest = {
      customerId: this.saleForm.value.customerId,
      items: this.selectedItems.map((si) => ({
        itemId: si.item.id,
        quantity: Number(si.quantity), // Asegura que sea número
      })),
    };

    console.log('🟢 Enviando venta con cantidades:', JSON.stringify(saleRequest));

    this.saleService.createSale(saleRequest).subscribe({
      next: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: 'Venta registrada correctamente',
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar-panel'],
        });
        this.saleForm.reset();
        this.selectedItems = [];
        this.itemSearchControl.setValue('');
        this.loadItems();

      },
      error: (err) => {
        console.error('Error al registrar la venta:', err);
        const errorMsg = err.error?.message || err.message || JSON.stringify(err);
        this.snackBar.open('Error al registrar la venta: ' + errorMsg, 'Cerrar', {
          duration: 6000,
        });
      },
    });
  }

    onQuantityChange(event: Event, index: number): void {
      const input = event.target as HTMLInputElement;
      let quantity = parseInt(input.value, 10);

      if (isNaN(quantity) || quantity <= 0) {
        quantity = 1;
      }
      const maxStock = this.selectedItems[index].item.stock;
      if (quantity > maxStock) {
        quantity = maxStock;
      }
      input.value = quantity.toString();
      this.selectedItems[index].quantity = quantity;
    }


  displayItem(item: Item): string {
    return item ? `${item.name} - ${item.brand} (${item.code})` : '';
  }

  get total(): number {
    return this.selectedItems.reduce(
      (acc, si) => acc + si.quantity * si.item.price,
      0
    );
  }
}

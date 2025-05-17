// add-customer-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Customer } from '../../models/customer';
import { CustomerService } from '../../services/customer.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-add-customer-dialog',
  templateUrl: './add-customer-dialog.component.html',
  styleUrls: ['./add-customer-dialog.component.css'],
})


export class AddCustomerDialogComponent {
  customer: Customer = {
    name: '',
    documentNumber: '',
    address: '',
    phone: '',
  };

  constructor(
    private dialogRef: MatDialogRef<AddCustomerDialogComponent>,
    private customerService: CustomerService
  ) {}

    save(form: NgForm) {
      if (form.invalid) {
        form.control.markAllAsTouched(); // Marca todo para mostrar errores
        return;
      }

      this.customerService.create(this.customer).subscribe({
        next: (newCustomer) => this.dialogRef.close(newCustomer),
        error: (err) => alert(err.error) // Por si el backend devuelve error como "documento ya existe"
      });
    }

}

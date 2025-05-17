import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { VentasComponent } from './ventas/ventas.component';
import { HistorialComponent } from './historial/historial.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { RegisterItemComponent } from './register-item/register-item.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { ItemsComponent } from './items/items.component';
import { ItemEditDialogComponent } from './item-edit-dialog/item-edit-dialog.component'; // Asegúrate de tener este archivo
import { MaterialModule } from '../modules/material/material.module';
import { AddCustomerDialogComponent } from './add-customer-dialog/add-customer-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ToastComponent } from './toast/toast.component';
import { CustomSnackbarComponent } from '../shared/custom-snackbar/custom-snackbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';



@NgModule({
  declarations: [
    DashboardComponent,
    VentasComponent,
    HistorialComponent,
    AdminComponent,
    RegisterItemComponent,
    ItemsComponent,
    ItemEditDialogComponent,
    AddCustomerDialogComponent,
    ToastComponent,
    CustomSnackbarComponent,
    SalesReportComponent,


  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    MatSnackBarModule,
    MatDialogModule,
    MatAutocompleteModule,

  ]
})
export class AdminModule { }

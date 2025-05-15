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



@NgModule({
  declarations: [
    DashboardComponent,
    VentasComponent,
    HistorialComponent,
    AdminComponent,
    RegisterItemComponent,
    ItemsComponent,
    ItemEditDialogComponent,



  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MaterialModule

  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VentasComponent } from './ventas/ventas.component';
import { HistorialComponent } from './historial/historial.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterItemComponent } from './register-item/register-item.component';
import { ItemsComponent } from './items/items.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, // AdminComponent como contenedor principal
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'ventas', component: VentasComponent },
      { path: 'historial', component: HistorialComponent },
      { path: 'register-item', component: RegisterItemComponent },
      { path: 'items', component: ItemsComponent }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Importamos las rutas hijas usando forChild
  exports: [RouterModule]
})
export class AdminRoutingModule { }

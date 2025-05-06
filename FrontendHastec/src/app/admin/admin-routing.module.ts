import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VentasComponent } from './ventas/ventas.component';
import { HistorialComponent } from './historial/historial.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ventas', component: VentasComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'admin', component: AdminComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

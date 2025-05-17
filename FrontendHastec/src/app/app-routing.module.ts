import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { InstalacionesElectricasComponent } from './components/servicios/instalaciones-electricas/instalaciones-electricas.component';
import { CamarasSeguridadComponent } from './components/servicios/camaras-seguridad/camaras-seguridad.component';
import { SistemasComputacionalesComponent } from './components/servicios/sistemas-computacionales/sistemas-computacionales.component';
import { RebobinadoMotoresComponent } from './components/servicios/rebobinado-motores/rebobinado-motores.component';
import { ProductosComponent } from './components/productos/productos.component';
import { SaleReceiptComponent } from './components/sale-receipt/sale-receipt.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { VentasComponent } from './admin/ventas/ventas.component';
import { HistorialComponent } from './admin/historial/historial.component';
import { AdminComponent } from './admin/admin/admin.component';
import { RegisterItemComponent } from './admin/register-item/register-item.component';
import { ItemsComponent } from './admin/items/items.component';
import { SalesReportComponent } from './admin/sales-report/sales-report.component';

const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'nosotros', component: NosotrosComponent},
  {path: 'instalaciones-electricas', component: InstalacionesElectricasComponent},
  {path: 'camaras-seguridad', component: CamarasSeguridadComponent},
  {path: 'sistemas-computacionales', component: SistemasComputacionalesComponent},
  {path: 'rebobinado-motores', component: RebobinadoMotoresComponent},
  {path: 'productos', component: ProductosComponent},
  {path: 'sale-receipt', component: SaleReceiptComponent},


  // RUTA PADRE (usa router-outlet en admin.component.html)

  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'ventas', component: VentasComponent },
      { path: 'historial', component: HistorialComponent },
      { path: 'register-item', component: RegisterItemComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'sales-report', component: SalesReportComponent }


      // puedes agregar más hijos aquí

    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

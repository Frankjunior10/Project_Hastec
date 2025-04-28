import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { InstalacionesElectricasComponent } from './components/servicios/instalaciones-electricas/instalaciones-electricas.component';
import { CamarasSeguridadComponent } from './components/servicios/camaras-seguridad/camaras-seguridad.component';
import { SistemasComputacionalesComponent } from './components/servicios/sistemas-computacionales/sistemas-computacionales.component';
import { RebobinadoMotoresComponent } from './components/servicios/rebobinado-motores/rebobinado-motores.component';
import { ProductosComponent } from './components/productos/productos.component';

const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'nosotros', component: NosotrosComponent},
  {path: 'instalaciones-electricas', component: InstalacionesElectricasComponent},
  {path: 'camaras-seguridad', component: CamarasSeguridadComponent},
  {path: 'sistemas-computacionales', component: SistemasComputacionalesComponent},
  {path: 'rebobinado-motores', component: RebobinadoMotoresComponent},
  {path: 'productos', component: ProductosComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './modules/material/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { NosotrosComponent } from './components/nosotros/nosotros.component';
import { InstalacionesElectricasComponent } from './components/servicios/instalaciones-electricas/instalaciones-electricas.component';
import { CamarasSeguridadComponent } from './components/servicios/camaras-seguridad/camaras-seguridad.component';
import { SistemasComputacionalesComponent } from './components/servicios/sistemas-computacionales/sistemas-computacionales.component';
import { RebobinadoMotoresComponent } from './components/servicios/rebobinado-motores/rebobinado-motores.component';
import { ProductosComponent } from './components/productos/productos.component';
//import { SaleReceiptComponentComponent } from './components/sale-receipt-component/sale-receipt-component.component';
import { SaleReceiptComponent } from './components/sale-receipt/sale-receipt.component';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    HomeComponent,
    FooterComponent,
    NosotrosComponent,
    InstalacionesElectricasComponent,
    CamarasSeguridadComponent,
    SistemasComputacionalesComponent,
    RebobinadoMotoresComponent,
    ProductosComponent,
    //SaleReceiptComponentComponent,
    SaleReceiptComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,




  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

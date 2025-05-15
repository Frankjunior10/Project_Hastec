import { Component, OnInit } from '@angular/core';
import { Item, Sede } from '../../models/Item';
import { Category, CategoryService } from '../../services/category.service';
import { ItemService } from '../../services/item.service';
import { SedeService } from '../../services/sede.service';  // Asegúrate de importar el servicio SedeService

@Component({
  selector: 'app-register-item',
  templateUrl: './register-item.component.html',
  styleUrls: ['./register-item.component.css']
})
export class RegisterItemComponent implements OnInit {

  item: Item = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    lowStockThreshold: 0,
    category: { id: 0, name: '' },
    sedeId: 0,
    sede: { id: 0, nombre: '', direccion: '' },
    createdAt: new Date().toISOString(),
    imageUrl: '',
    code: '',
    brand: '',
    color: '',
    proveedor: '',
    ubicacion: '',
    estado: '',
    esActivo: true // puedes usar true o false según tu lógica por defecto
  };


  categorias: Category[] = [];
  sedes: Sede[] = [];

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService,
    private sedeService: SedeService
  ) {}

  ngOnInit(): void {
    // Obtener las categorías
    this.categoryService.getAll().subscribe({
      next: data => this.categorias = data,
      error: err => console.error('Error al obtener categorías', err)
    });

    // Obtener las sedes
    this.sedeService.getAll().subscribe({
      next: data => this.sedes = data,
      error: err => console.error('Error al obtener sedes', err)
    });
  }

  limpiarFormulario(): void {
    this.item = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      stock: 0,
      lowStockThreshold: 0,
      category: { id: 0, name: '' },
      sedeId: 0,
      sede: { id: 0, nombre: '', direccion: '' },
      createdAt: new Date().toISOString(),
      imageUrl: '',
      code: '',
      brand: '',
      color: '',
      proveedor: '',
      ubicacion: '',
      estado: '',
      esActivo: true
    };
  }


  selectedImageFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImageFile = input.files[0];
    }
  }

 registrarItem(): void {
  if (!this.item.name || !this.item.price || !this.item.stock || !this.item.category.id || !this.item.sedeId) {
    alert('Completa los campos requeridos');
    return;
  }

  // Armar sede como objeto { id: ... }
  const itemAEnviar = {
    ...this.item,
    sede: { id: this.item.sedeId }, // ✅ esto es lo que espera el backend
  };

  this.itemService.createItem(itemAEnviar).subscribe({
    next: (itemCreado) => {
      if (this.selectedImageFile) {
        this.itemService.uploadItemImage(itemCreado.id, this.selectedImageFile).subscribe({
          next: () => {
            alert('Producto registrado correctamente con imagen');
            this.limpiarFormulario();
          },
          error: err => {
            console.error('Error al subir imagen', err);
            alert('Producto creado, pero hubo error al subir imagen');
          }
        });
      } else {
        alert('Producto registrado correctamente');
        this.limpiarFormulario();
      }
    },
    error: err => {
      console.error('Error al registrar producto', err);
      alert('Error al registrar el producto');
    }
  });
 }

}


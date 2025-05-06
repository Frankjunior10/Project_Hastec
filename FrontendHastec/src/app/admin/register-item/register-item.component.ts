import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/Item';
import { Category, CategoryService } from '../../services/category.service';
import { ItemService } from '../../services/item.service';

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
    categoryId: 0
  };

  categorias: Category[] = [];

  constructor(
    private itemService: ItemService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next: data => this.categorias = data,
      error: err => console.error('Error al obtener categorías', err)
    });
  }

  registrarItem(): void {
    if (!this.item.name || !this.item.price || !this.item.stock || !this.item.categoryId) {
      alert('Completa los campos requeridos');
      return;
    }

    this.itemService.createItem(this.item).subscribe({
      next: () => {
        alert('Producto registrado correctamente');
        this.limpiarFormulario();
      },
      error: err => {
        console.error('Error al registrar producto', err);
        alert('Error al registrar el producto');
      }
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
      categoryId: 0
    };
  }
}

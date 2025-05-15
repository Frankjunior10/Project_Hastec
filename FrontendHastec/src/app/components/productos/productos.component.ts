import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/Item';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  items: Item[] = [];

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe({
      next: (data) => this.items = data,
      error: (err) => console.error('Error al obtener productos:', err)
    });
  }

  getWhatsappLink(item: Item): string {
    const numero = '51989549673'; // Reemplaza con tu número de WhatsApp con código de país
    const mensaje = `Hola, estoy interesado en el producto "${item.name}". ¿Podrías brindarme más información?`;
    return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  }

}

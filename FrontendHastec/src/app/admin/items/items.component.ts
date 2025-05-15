import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/Item';
import { Sede } from '../../models/sede';
import { ItemService } from '../../services/item.service';
import { SedeService } from '../../services/sede.service';
import { MatDialog } from '@angular/material/dialog';
import { ItemEditDialogComponent } from '../item-edit-dialog/item-edit-dialog.component';

// Interfaz extendida para controlar la expansión de descripción
interface ItemConDescripcion extends Item {
  expandirDescripcion?: boolean;
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: ItemConDescripcion[] = [];
  itemsFiltrados: ItemConDescripcion[] = [];
  sedes: Sede[] = [];
  selectedSede: number | null = null;
  searchText: string = '';
  now = Date.now();


  constructor(
    private itemService: ItemService,
    private sedeService: SedeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadItems();
    this.loadSedes();
  }

  loadItems(): void {
    this.itemService.getItems().subscribe((items: Item[]) => {
      this.items = items.map(item => ({
        ...item,
        expandirDescripcion: false
      }));
      this.filterItems();
    });
  }

  loadSedes(): void {
    this.sedeService.getSedes().subscribe((sedes: Sede[]) => {
      this.sedes = sedes;
    });
  }

    filterItems(): void {
      let filtered = this.items;

      // Filtrar por sede si se selecciona alguna
      if (this.selectedSede) {
        filtered = filtered.filter(item => item.sede?.id === this.selectedSede);
      }

      // Filtrar por texto de búsqueda (en nombre y código)
      if (this.searchText && this.searchText.trim() !== '') {
        const lowerSearch = this.searchText.toLowerCase();
        filtered = filtered.filter(item =>
          (item.name?.toLowerCase().includes(lowerSearch) ||
          item.code?.toLowerCase().includes(lowerSearch))
        );
      }

      this.itemsFiltrados = filtered;
    }


  editarItem(item: ItemConDescripcion): void {
    const dialogRef = this.dialog.open(ItemEditDialogComponent, {
      width: '400px',
      data: { ...item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.itemService.updateItem(result.id, result).subscribe(() => {
          if (result.imageFile) {
            this.itemService.uploadItemImage(result.id, result.imageFile).subscribe(() => {
              this.actualizarItemEnLista(result.id);
            });
          } else {
            this.actualizarItemEnLista(result.id);
          }
        });
      }
    });
  }

  actualizarItemEnLista(itemId: number): void {
    this.itemService.getItem(itemId).subscribe((itemActualizado: ItemConDescripcion) => {
      itemActualizado.expandirDescripcion = false;
      const index = this.items.findIndex(i => i.id === itemId);
      if (index !== -1) {
        this.items[index] = itemActualizado;
        this.now = Date.now();  // Actualiza timestamp para evitar cache
        this.filterItems();
      }
    });
  }

  eliminarItem(id: number): void {
    if (confirm('¿Estás seguro de eliminar este item?')) {
      this.itemService.deleteItem(id).subscribe(() => {
        this.loadItems();
      });
    }
  }
}

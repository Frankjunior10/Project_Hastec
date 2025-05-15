import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from '../../models/Item';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-edit-dialog',
  templateUrl: './item-edit-dialog.component.html',
  styleUrls: ['./item-edit-dialog.component.css']
})
export class ItemEditDialogComponent {
  previewUrl: string | ArrayBuffer | null = null;
  selectedImage: File | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private dialogRef: MatDialogRef<ItemEditDialogComponent>,
    private itemService: ItemService
  ) {
    if (data.imageUrl) {
      this.previewUrl = 'http://localhost:8080' + data.imageUrl;
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
      this.selectedImage = file;
    }
  }

  guardarCambios(): void {
    // Actualiza los datos básicos del item
    this.itemService.updateItem(this.data.id, this.data).subscribe({
      next: updatedItem => {
        if (this.selectedImage) {
          // Si se seleccionó una nueva imagen, la subimos
          this.itemService.uploadItemImage(updatedItem.id, this.selectedImage).subscribe({
            next: () => this.dialogRef.close(updatedItem),
            error: err => {
              console.error('Error al subir imagen', err);
              this.dialogRef.close(updatedItem); // cerramos igual
            }
          });
        } else {
          this.dialogRef.close(updatedItem);
        }
      },
      error: err => {
        console.error('Error al actualizar item', err);
      }
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}

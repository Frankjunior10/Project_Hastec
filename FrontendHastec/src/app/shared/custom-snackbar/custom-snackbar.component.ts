import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-snackbar',
  template: `
    <div class="custom-snackbar">
      <mat-icon>check_circle</mat-icon>
      <span>{{ data }}</span>
    </div>
  `,
  styles: [`
    .custom-snackbar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      color: white;
      font-weight: bold;
      font-size: 16px;
    }

    mat-icon {
      color: #4caf50;
    }
  `]
})
export class CustomSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {}
}

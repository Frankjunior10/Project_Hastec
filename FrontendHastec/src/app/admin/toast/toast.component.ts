import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast" [ngClass]="data.type">
      <mat-icon>{{ getIcon(data.type) }}</mat-icon>
      <span>{{ data.message }}</span>
    </div>
  `,
  styles: [`
    .toast {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #fff;
      font-weight: 500;
    }

    .toast.success { background: #43a047; }
    .toast.error { background: #e53935; }
    .toast.info { background: #1e88e5; }
    .toast.warning { background: #fbc02d; color: #000; }

    mat-icon {
      font-size: 20px;
    }
  `]
})
export class ToastComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string, type: 'success' | 'error' | 'info' | 'warning' }) {}

  getIcon(type: string): string {
    switch (type) {
      case 'success': return 'check_circle';
      case 'error': return 'error';
      case 'info': return 'info';
      case 'warning': return 'warning';
      default: return 'info';
    }
  }
}

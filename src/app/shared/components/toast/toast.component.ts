import { Component, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from './toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="toast()" class="toast-backdrop" (click)="close()">
      <div class="toast-content" (click)="$event.stopPropagation()">
        <div class="toast-body">
          <i class="fas fa-check-circle success-icon" *ngIf="toast()?.type !== 'error'"></i>
          <p>{{ toast()?.text }}</p>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnDestroy {
  toast = signal<ToastMessage | null>(null);
  private sub: Subscription;
  private timerId: any;

  constructor(public toastService: ToastService) {
    this.sub = this.toastService.toast$.subscribe((toast) => {
      this.toast.set(toast);

      // Clear existing timer
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }

      // Set new timer if toast exists
      if (toast && toast.duration) {
        this.timerId = setTimeout(() => {
          this.close();
        }, toast.duration);
      }
    });
  }

  close() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.toastService.clear();
    this.toast.set(null);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }
}

import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastMessage } from './toast.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="toast" class="toast show" [ngClass]="toast.type" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto">{{ toast.type === 'success' ? 'Success' : toast.type === 'error' ? 'Error' : 'Info' }}</strong>
        <button type="button" class="btn-close" (click)="close()" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        {{ toast.text }}
      </div>
    </div>
  `,
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnDestroy {
  toast: ToastMessage | null = null;
  private sub: Subscription;
  private timerSub?: Subscription;

  constructor(public toastService: ToastService) {
    this.sub = this.toastService.toast$.subscribe((toast) => {
      this.toast = toast;
      if (this.timerSub) {
        this.timerSub.unsubscribe();
        this.timerSub = undefined;
      }
      if (toast && toast.duration) {
        this.timerSub = timer(toast.duration).subscribe(() => {
          this.close();
        });
      }
    });
  }

  close() {
    this.toastService.clear();
    this.toast = null;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.timerSub?.unsubscribe();
  }
}

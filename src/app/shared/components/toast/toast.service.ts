import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  text: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastSub = new BehaviorSubject<ToastMessage | null>(null);
  toast$ = this.toastSub.asObservable();

  show(text: string, type: 'success' | 'error' | 'info' = 'success', duration = 2000) {
    this.toastSub.next({ text, type, duration });
  }

  clear() {
    this.toastSub.next(null);
  }
}

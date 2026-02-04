import { Component, output, input, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-modal.component.html',
  styleUrls: ['./toast-modal.component.scss'],
})
export class ToastModalComponent {
  message = input<string>('');
  open = input<boolean>(false);
  duration = input<number>(2000);
  contained = input<boolean>(false);
  closeToast = output<void>();

  private timer?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      if (this.open() && this.duration() > 0) {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.close(), this.duration());
      }
    });
  }

  close() {
    clearTimeout(this.timer);
    this.closeToast.emit();
  }
}

import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss'],
})
export class MessageModalComponent {
  message = input('');
  open = input(false);
  loading = input(false);
  closeModal = output<void>();

  close() {
    this.closeModal.emit();
  }
}

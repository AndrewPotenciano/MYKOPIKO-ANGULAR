import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, OrderService } from '@shared/services';
import { LABELS } from '@shared/constants/label.const';
import { MESSAGES } from '@shared/constants/message.const';

import { CartItem } from '@shared/models';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css'],
})
export class Payment implements OnInit {
  public readonly LABELS = LABELS;
  public readonly MESSAGES = MESSAGES;
  total = 0;
  deliveryFee = 50;
  selectedPayment: 'gcash' | 'maya' = 'gcash';
  referenceNumber = '';
  isReferenceValid = false;
  cartItems: CartItem[] = [];

  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);

  ngOnInit(): void {
    this.cartService.cartSubject.subscribe((items: CartItem[]) => {
      this.cartItems = items;
      const subtotal = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
      this.total = subtotal + this.deliveryFee;
    });
  }

  onSelectPayment(method: 'gcash' | 'maya'): void {
    this.selectedPayment = method;
    this.referenceNumber = '';
    this.isReferenceValid = false;
  }

  onReferenceNumberInput(value: string): void {
    this.referenceNumber = value;
    this.isReferenceValid = this.validateReference(value, this.selectedPayment);
  }

  validateReference(ref: string, method: 'gcash' | 'maya'): boolean {
    // Updated based on user feedback:
    // GCash: 9-13 digits (covers Send Money, Bank Transfer, QR)
    // Maya: 12-16 characters (covers Smart Padala, QR, etc.)
    if (method === 'gcash') return /^\d{9,13}$/.test(ref);
    if (method === 'maya') return /^[a-zA-Z0-9]{12,16}$/.test(ref);
    return false;
  }

  confirmPayment(): void {
    const lastOrderId = localStorage.getItem('last_order_id');

    if (lastOrderId && this.isReferenceValid) {
      this.orderService
        .updateOrder(lastOrderId, {
          paymentMethod: this.selectedPayment,
          paymentReference: this.referenceNumber,
          status: 'confirmed',
        })
        .subscribe({
          next: () => {
            this.router.navigate(['/menu/finish']).catch(() => { });
          },
          error: (err) => {
            console.error('Payment confirmation failed', err);
            alert('Failed to confirm payment. Please try again.');
          },
        });
    } else if (!lastOrderId) {
      alert('Order session expired. Please start again.');
      this.router.navigate(['/menu']).catch(() => { });
    }
  }

  goBack(): void {
    this.router.navigate(['/menu/checkout']).catch(() => { });
  }
}

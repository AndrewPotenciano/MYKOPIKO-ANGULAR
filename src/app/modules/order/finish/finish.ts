import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService, OrderService } from '@shared/services';
import { LABELS } from '@shared/constants/label.const';
import { MESSAGES } from '@shared/constants/message.const';

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finish.html',
  styleUrls: ['./finish.css'],
})
export class Finish implements OnInit {
  public readonly LABELS = LABELS;
  public readonly MESSAGES = MESSAGES;
  orderNumber = signal('Loading...');

  private router = inject(Router);
  private cart = inject(CartService);
  private orderService = inject(OrderService);

  ngOnInit(): void {

    const lastOrderId = localStorage.getItem('last_order_id');

    if (lastOrderId) {
      this.orderService.getOrderById(lastOrderId).subscribe({
        next: (order) => {
          if (order) {
            this.orderNumber.set(order.orderNumber);
          } else {
            this.orderNumber.set('Order not found');
          }
        },
        error: () => {
          this.orderNumber.set('Error loading order');
        },
      });
    } else {
      this.router.navigate(['/']);
    }
    // Clear cart when landing on finish page
    this.cart.clear();

    // Mark order as finished for tracking access
    localStorage.setItem('is_order_finished', 'true');

  }

  trackOrder(): void {
    // Navigate to track order page
    this.router.navigate(['/order/track']).catch(() => { });
  }

  backHome(): void {
    this.router.navigate(['/']).catch(() => { });
  }
}

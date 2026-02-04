import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
  orderNumber = 'Loading...';

  private router = inject(Router);
  private cart = inject(CartService);
  private orderService = inject(OrderService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    const lastOrderId = localStorage.getItem('last_order_id');

    if (lastOrderId) {
      this.orderService.getOrderById(lastOrderId).subscribe({
        next: (order) => {
          if (order) {
            this.orderNumber = order.orderNumber;
          } else {
            this.orderNumber = 'ORD-' + Math.floor(Math.random() * 1000000);
          }
          this.cdr.detectChanges();
        },
        error: () => {
          this.orderNumber = 'ORD-' + Math.floor(Math.random() * 1000000);
          this.cdr.detectChanges();
        },
      });
    } else {
      this.orderNumber = 'ORD-' + Math.floor(Math.random() * 1000000);
    }

    // Clear cart when landing on finish page
    this.cart.clear();

    // Mark order as finished for tracking access
    localStorage.setItem('is_order_finished', 'true');

    // Cleanup old keys if they exist
    localStorage.removeItem('latestOrder');
  }

  trackOrder(): void {
    // Navigate to track order page
    this.router.navigate(['/order/track']).catch(() => { });
  }

  backHome(): void {
    this.router.navigate(['/']).catch(() => { });
  }
}

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OrderService, GoogleApi } from '@shared/services';
import { Order, Rider } from '@shared/models';
import { Subscription } from 'rxjs';
import { LABELS } from '@shared/constants/label.const';
import { MESSAGES } from '@shared/constants/message.const';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track.html',
  styleUrls: ['./track.css'],
})
export class Track implements OnInit, OnDestroy {
  public readonly LABELS = LABELS;
  public readonly MESSAGES = MESSAGES;

  mapUrl!: SafeResourceUrl;
  currentOrder: Order | null = null;
  private orderSub?: Subscription;

  riderInfo: Rider | null = null;

  trackSteps = [
    { icon: 'coffee', label: 'Preparing Your Order', completed: true },
    { icon: 'truck', label: 'Out For Delivery', completed: true },
    { icon: 'box', label: 'Delivered', completed: false },
  ];

  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private orderService = inject(OrderService);
  private googleApi = inject(GoogleApi);
  loading$ = this.orderService.loading$;

  ngOnInit(): void {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.242073642938!2d121.05874907362166!3d14.585277477454598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c816c53ed657%3A0x368fa762e1111364!2sThe%20Orient%20Square%2C%20F.%20Ortigas%20Jr.%20Rd%2C%20Ortigas%20Center%2C%20Pasig%2C%201600%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1768383205196!5m2!1sen!2sph',
    );

    this.loadLastOrder();

  }

  ngOnDestroy(): void {
    this.orderSub?.unsubscribe();
  }

  loadLastOrder(): void {
    const orderId = localStorage.getItem('last_order_id');
    if (orderId) {
      this.orderSub = this.orderService.getOrderById(orderId).subscribe({
        next: (order) => {
          this.currentOrder = order;
          if (order?.riderId) {
            this.orderService.getRider(order.riderId).subscribe((rider) => {
              this.riderInfo = rider;
              console.log('Rider loaded:', rider);
            });
          }
        },
        error: (err) => {
          console.error('Failed to load order', err);
        },
      });
    }
  }

  callRider(): void {
    if (this.riderInfo) {
      alert(`Calling ${this.riderInfo.name} at ${this.riderInfo.phone}`);
      window.location.href = `tel:${this.riderInfo.phone}`;
    }
  }

  goBack(): void {
    if (this.currentOrder) {
      this.router.navigate(['/order/finish']).catch(() => { });
    } else {
      this.router.navigate(['/']).catch(() => { });
    }
  }

  browseMenu(): void {
    if (this.googleApi.isLoggedIn()) {
      this.router.navigate(['/order']).catch(() => { });
    } else {
      this.router.navigate(['/login']).catch(() => { });
    }
  }
}

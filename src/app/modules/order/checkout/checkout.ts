import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService, OrderService } from '@shared/services';
import { PhoneFormatDirective, TrimDirective, LowercaseOnBlurDirective, TitleCaseOnBlurDirective } from '@shared/directives';
import { CartItem, Order } from '@shared/models';
import { GoogleApi } from '../../../google-api';
import { Subscription } from 'rxjs';
import { LABELS } from '@shared/constants/label.const';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PhoneFormatDirective,
    TrimDirective,
    RouterLink,
    NgxTrimDirectiveModule,
    LowercaseOnBlurDirective,
    TitleCaseOnBlurDirective
  ],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css'],
})
export class Checkout implements OnInit, OnDestroy {
  public readonly LABELS = LABELS;
  cartItems: CartItem[] = [];
  subtotal = 0;
  deliveryFee = 50;

  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  private googleApi = inject(GoogleApi);
  private fb = inject(FormBuilder);
  private userProfileSubscription?: Subscription;

  loading$ = this.orderService.loading$;

  checkoutForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    phone: ['', Validators.required],
  });

  ngOnInit(): void {
    // Reset tracking access for new order attempt
    localStorage.removeItem('is_order_finished');

    this.cartService.cartSubject.subscribe((items) => {
      this.cartItems = items;
      this.calculateSubtotal();
    });

    // Pre-fill customer info if user is logged in with Google
    this.loadGoogleUserInfo();

    // Listen for login events (when user logs in while on this page)
    this.userProfileSubscription = this.googleApi.userProfileSubject.subscribe((userInfo) => {
      if (userInfo?.info) {
        this.populateFormFromGoogleAuth(userInfo.info);
      }
    });
  }

  ngOnDestroy(): void {
    this.userProfileSubscription?.unsubscribe();
  }

  private loadGoogleUserInfo(): void {
    const userProfile = this.googleApi.getUserProfile();
    if (userProfile) {
      this.populateFormFromGoogleAuth(userProfile);
    }
  }

  private populateFormFromGoogleAuth(userInfo: { name?: string; email?: string }): void {
    // Only populate if fields are empty to avoid overwriting user's manual input
    const currentName = this.checkoutForm.get('name')?.value;
    const currentEmail = this.checkoutForm.get('email')?.value;

    if (!currentName && userInfo.name) {
      this.checkoutForm.patchValue({ name: userInfo.name });
    }
    if (!currentEmail && userInfo.email) {
      this.checkoutForm.patchValue({ email: userInfo.email });
    }
  }

  calculateSubtotal(): void {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  goBack(): void {
    this.router.navigate(['/order']).catch(() => { });
  }

  confirmOrder(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    const order: Order = {
      orderNumber: this.orderService.generateOrderNumber(),
      customerInfo: this.checkoutForm.value,
      items: [...this.cartItems],
      subtotal: this.subtotal,
      deliveryFee: this.deliveryFee,
      total: this.subtotal + this.deliveryFee,
      orderDate: new Date().toISOString(),
      status: 'pending',
    };

    this.orderService.createOrder(order).subscribe({
      next: (savedOrder) => {

        if (savedOrder.id) {
          localStorage.setItem('last_order_id', savedOrder.id.toString());
        }
        this.router.navigate(['/order/payment']).catch(() => { });
      },
      error: (err) => {
        console.error('Checkout failed', err);
        alert('Failed to place order. Please try again.');
      },
    });
  }

  resetCheckout(): void {
    this.checkoutForm.reset();
    localStorage.removeItem('is_order_finished');
    this.cartService.clear();
  }

  // Getters for easy access in template
  get name(): AbstractControl | null { return this.checkoutForm.get('name'); }
  get email(): AbstractControl | null { return this.checkoutForm.get('email'); }
  get address(): AbstractControl | null { return this.checkoutForm.get('address'); }
  get phone(): AbstractControl | null { return this.checkoutForm.get('phone'); }
}

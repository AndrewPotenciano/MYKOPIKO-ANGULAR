import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService, OrderService } from '@shared/services';
import { PhoneFormatDirective, TrimDirective } from '@shared/directives';
import { CheckoutForm, CartItem, Order } from '@shared/models';
import { GoogleApi } from '../../../google-api';
import { Subscription } from 'rxjs';
import { LABELS } from '@shared/constants/label.const';

@Component({
	selector: 'app-checkout',
	standalone: true,
	imports: [CommonModule, FormsModule, PhoneFormatDirective, TrimDirective, RouterLink],
	templateUrl: './checkout.html',
	styleUrls: ['./checkout.css'],
})
export class Checkout implements OnInit, OnDestroy {
	public readonly LABELS = LABELS;
	cartItems: CartItem[] = [];
	subtotal = 0;

	private cartService = inject(CartService);
	private orderService = inject(OrderService);
	private router = inject(Router);
	private googleApi = inject(GoogleApi);
	private userProfileSubscription?: Subscription;

	loading$ = this.orderService.loading$;

	checkoutForm: CheckoutForm = {
		name: '',
		email: '',
		address: '',
		phone: ''
	};

	ngOnInit(): void {
		// Reset tracking access for new order attempt
		localStorage.removeItem('is_order_finished');

		this.cartService.cartSubject.subscribe(items => {
			this.cartItems = items;
			this.calculateSubtotal();
		});

		// Pre-fill customer info if user is logged in with Google
		this.loadGoogleUserInfo();

		// Listen for login events (when user logs in while on this page)
		this.userProfileSubscription = this.googleApi.userProfileSubject.subscribe(userInfo => {
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
		if (!this.checkoutForm.name && userInfo.name) {
			this.checkoutForm.name = userInfo.name;
		}
		if (!this.checkoutForm.email && userInfo.email) {
			this.checkoutForm.email = userInfo.email;
		}
	}

	calculateSubtotal(): void {
		this.subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
	}

	goBack(): void {
		this.router.navigate(['/menu']).catch(() => { });
	}

	confirmOrder(form: NgForm): void {
		if (form.invalid) {
			Object.values(form.controls).forEach(control => control.markAsTouched());
			return;
		}

		const order: Order = {
			orderNumber: this.orderService.generateOrderNumber(),
			customerInfo: { ...this.checkoutForm },
			items: [...this.cartItems],
			subtotal: this.subtotal,
			deliveryFee: 50,
			total: this.subtotal + 50,
			orderDate: new Date().toISOString(),
			status: 'pending'
		};

		this.orderService.createOrder(order).subscribe({
			next: (savedOrder) => {
				// Store order ID for tracking
				if (savedOrder.id) {
					localStorage.setItem('last_order_id', savedOrder.id.toString());
				}
				this.router.navigate(['/menu/payment']).catch(() => { });
			},
			error: (err) => {
				console.error('Checkout failed', err);
				alert('Failed to place order. Please try again.');
			}
		});
	}

	resetCheckout(): void {
		this.checkoutForm = { name: '', email: '', address: '', phone: '' };
		localStorage.removeItem('is_order_finished');
		this.cartService.clear();
	}

	formatFullName(): void {
		if (!this.checkoutForm.name) return;
		this.checkoutForm.name = this.checkoutForm.name
			.trim()
			.toLowerCase()
			.replace(/(^|\s)\S/g, (char: string) => char.toUpperCase());
	}
}
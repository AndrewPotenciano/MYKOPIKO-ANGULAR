import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
import { PhoneFormatDirective } from '../../../shared/directives/phone-format.directive';
import { TrimDirective } from '../../../shared/directives/trim.directive';
import { CheckoutForm } from '../../../shared/models/checkout-form.model';
import { CartItem } from '../../../shared/models/cart-item.model';
@Component({
	selector: 'app-checkout',
	standalone: true,
	imports: [CommonModule, FormsModule, PhoneFormatDirective, TrimDirective, RouterLink],
	templateUrl: './checkout.html',
	styleUrls: ['./checkout.css'],
})
export class Checkout implements OnInit {
	cartItems: CartItem[] = [];
	subtotal = 0;

	private cartService = inject(CartService);
	private router = inject(Router);

	checkoutForm: CheckoutForm = {
		name: '',
		email: '',
		address: '',
		phone: ''
	};

	ngOnInit(): void {
		this.cartService.cartSubject.subscribe(items => {
			this.cartItems = items;
			this.calculateSubtotal();
		});
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
		this.router.navigate(['/menu/payment']).catch(() => { });
	}

	resetCheckout(): void {
		this.checkoutForm = { name: '', email: '', address: '', phone: '' };
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
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
import { Footer } from '../../../shared/layouts/base-layout/footer/footer';
import { PhoneFormatDirective } from '../../../shared/directives/phone-format.directive';
import { TrimDirective } from '../../../shared/directives/trim.directive';

interface CheckoutForm {
	name: string;
	email: string;
	address: string;
	phone: string;
}

interface CartItem {
	name: string;
	price: number;
	quantity: number;
	img?: string;
}

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

	checkoutForm: CheckoutForm = {
		name: '',
		email: '',
		address: '',
		phone: ''
	};

	constructor(private cartService: CartService, private router: Router) { }

	ngOnInit() {
		this.cartService.cartSubject.subscribe(items => {
			this.cartItems = items;
			this.calculateSubtotal();
		});
	}

	calculateSubtotal() {
		this.subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
	}

	goBack() {
		this.router.navigate(['/menu']).catch(() => { });
	}

	confirmOrder(form: NgForm) {
		if (form.invalid) {
			Object.values(form.controls).forEach(control => control.markAsTouched());
			return;
		}
		this.router.navigate(['/menu/payment']).catch(() => { });
	}

	resetCheckout() {
		this.checkoutForm = { name: '', email: '', address: '', phone: '' };
		this.cartService.clear();
	}

	formatFullName() {
		if (!this.checkoutForm.name) return;
		this.checkoutForm.name = this.checkoutForm.name
			.trim()
			.toLowerCase()
			.replace(/(^|\s)\S/g, (char: string) => char.toUpperCase());
	}
}
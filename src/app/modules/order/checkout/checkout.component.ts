import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
import { Footer } from '../../../shared/components/footer/footer.component';

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
	imports: [CommonModule, FormsModule, Footer],
	templateUrl: './checkout.component.html',
	styleUrls: ['./checkout.component.css'],
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

	constructor(public cartService: CartService, private router: Router) {}

	ngOnInit(): void {
		// Add your initialization logic here if needed
	}

	goBack() {
		this.router.navigate(['/menu']).catch(() => {});
	}
}
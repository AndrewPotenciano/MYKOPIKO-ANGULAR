import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CartService, CartItem } from '../cart.service';

@Component({
	selector: 'app-cart-modal',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './cart-modal.component.html',
	styleUrls: ['./cart-modal.component.scss']
})
export class CartModal {
	items$: Observable<CartItem[]>;
	modalOpen$: Observable<boolean>;

	constructor(private cart: CartService) {
		this.items$ = this.cart.items$;
		this.modalOpen$ = this.cart.modalOpen$;
	}

	increment(i: number) {
		const list = this.cart.items;
		this.cart.updateQuantity(i, list[i].quantity + 1);
	}

	decrement(i: number) {
		const list = this.cart.items;
		const newQty = Math.max(1, list[i].quantity - 1);
		this.cart.updateQuantity(i, newQty);
	}

	remove(i: number) {
		this.cart.remove(i);
	}

	close() {
		this.cart.close();
	}

	checkout() {
		this.cart.checkout();
	}

	total(items: CartItem[]) {
		return items.reduce((s, it) => s + it.price * it.quantity, 0);
	}
}

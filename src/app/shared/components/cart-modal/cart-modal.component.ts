import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';

@Component({
	selector: 'app-cart-modal',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './cart-modal.component.html',
	styleUrls: ['./cart-modal.component.scss']
})
export class CartModal {
	private cart = inject(CartService);
	items$: Observable<CartItem[]> = this.cart.items$;
	modalOpen$: Observable<boolean> = this.cart.modalOpen$;

	increment(i: number): void {
		const list = this.cart.items;
		this.cart.updateQuantity(i, list[i].quantity + 1);
	}

	decrement(i: number): void {
		const list = this.cart.items;
		const newQty = Math.max(1, list[i].quantity - 1);
		this.cart.updateQuantity(i, newQty);
	}

	remove(i: number): void {
		this.cart.remove(i);
	}

	close(): void {
		this.cart.close();
	}

	checkout(): void {
		this.cart.close();
		this.cart.checkout();
	}

	total(items: CartItem[]) {
		return items.reduce((s, it) => s + it.price * it.quantity, 0);
	}
}
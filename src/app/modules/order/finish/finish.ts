import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '@shared/services';

@Component({
	selector: 'app-finish',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './finish.html',
	styleUrls: ['./finish.css'],
})
export class Finish implements OnInit {
	orderNumber = '';

	private router = inject(Router);
	private cart = inject(CartService);

	ngOnInit(): void {
		// Generate order number
		this.orderNumber = 'ORD' + Date.now();
		localStorage.setItem('latestOrder', this.orderNumber);
		// Clear cart on finish
		this.cart.clear();
	}

	trackOrder(): void {
		// Navigate to track order page
		this.router.navigate(['/menu/track']).catch(() => { });
	}

	backHome(): void {
		this.router.navigate(['/']).catch(() => { });
	}
}
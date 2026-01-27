import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
@Component({
	selector: 'app-payment',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './payment.html',
	styleUrls: ['./payment.css'],
})
export class Payment implements OnInit {
	total = 0;
	refNumber = '';
	qrCodeClicked = false;

	public cartService = inject(CartService);
	private router = inject(Router);

	ngOnInit(): void {
		this.cartService.cartSubject.subscribe((items: any[]) => {
			const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
			this.total = subtotal + 50;
		});
		this.refNumber = 'REF' + Date.now();
	}

	onQrCodeClick(): void {
		this.qrCodeClicked = true;
	}

	confirmPayment(): void {
		if (this.qrCodeClicked) {
			this.router.navigate(['/menu/finish']).catch(() => {});
		} else {
			alert('Please scan the QR code first');
		}
	}

	goBack(): void {
		this.router.navigate(['/menu/checkout']).catch(() => {});
	}
}
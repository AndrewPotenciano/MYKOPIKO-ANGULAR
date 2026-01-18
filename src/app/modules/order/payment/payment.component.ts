import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../shared/services/cart.service';
import { Footer } from '../../../shared/components/footer/footer.component';

@Component({
	selector: 'app-payment',
	standalone: true,
	imports: [CommonModule, Footer],
	templateUrl: './payment.component.html',
	styleUrls: ['./payment.component.css'],
})
export class Payment implements OnInit {
	total = 0;
	refNumber = '';
	qrCodeClicked = false;

	constructor(public cartService: CartService, private router: Router) {}

	goBack() {
		this.router.navigate(['/menu/checkout']).catch(() => {});
	}
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
}
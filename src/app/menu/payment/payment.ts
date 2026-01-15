import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../shared/modules/layout/cart.service';
import { Footer}  from '../../shared/modules/layout/footer/footer';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, Footer],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css'],
})
export class Payment implements OnInit {
  total = 0;
  refNumber = '';
  qrCodeClicked = false;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.cartSubject.subscribe(items => {
      const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      this.total = subtotal + 50; 
    });


    this.refNumber = 'REF' + Date.now();
  }

  onQrCodeClick() {
    this.qrCodeClicked = true;
  }

  confirmPayment() {
    if (this.qrCodeClicked) {
      this.router.navigate(['/menu/finish']).catch(() => {});
    } else {
      alert('Please scan the QR code first');
    }
  }

  goBack() {
    this.router.navigate(['/menu/checkout']).catch(() => {});
  }
}

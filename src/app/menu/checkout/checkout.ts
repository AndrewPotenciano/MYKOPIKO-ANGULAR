import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../shared/modules/layout/cart.service';
import { Footer } from '../../shared/modules/layout/footer/footer'; 

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

  constructor(private cartService: CartService, private router: Router) {}

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
    this.router.navigate(['/menu']).catch(() => {});
  }

  confirmOrder() {
    if (this.checkoutForm.name && this.checkoutForm.email && this.checkoutForm.address && this.checkoutForm.phone) {
      this.router.navigate(['/menu/payment']).catch(() => {});
    } else {
      alert('Please fill in all fields');
    }
  }

  resetCheckout() {
    this.checkoutForm = { name: '', email: '', address: '', phone: '' };
    this.cartService.clear();
  }
}

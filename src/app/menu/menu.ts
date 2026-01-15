import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GoogleApi, UserInfo } from '../google-api';
import { Carousel, CarouselItem } from '../shared/modules/layout/carousel/carousel';
import { CartService } from '../shared/modules/layout/cart.service';
import { Footer } from '../shared/modules/layout/footer/footer';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, Carousel, Footer],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
})
export class Menu implements OnInit {
  userInfo?: UserInfo;
  
  popularMenuItems: CarouselItem[] = [
    {
      name: 'Caramel Latte',
      price: 200,
      image: '/images/caramel-latte.png',
      alt: 'Caramel Latte'
    },
    {
      name: 'Cold Brew Coffee',
      price: 150,
      image: '/images/cold-brew.png',
      alt: 'Cold Brew Coffee'
    },
    {
      name: 'Iced Coffee',
      price: 100,
      image: '/images/ice-coffee.png',
      alt: 'Iced Coffee'
    },
    {
      name: 'Strawberry Frappe',
      price: 150,
      image: '/images/Strawberry Frappe.webp',
      alt: 'Strawberry Frappe'
    },
    {
      name: 'Caramel Macchiato',
      price: 160,
      image: '/images/macchiato.png',
      alt: 'Caramel Macchiato'
    },
    {
      name: 'Caramel Frappe',
      price: 150,
      image: '/images/Caramel Frappe.webp',
      alt: 'Caramel Frappe'
    }
  ];

  frappMenuItems: CarouselItem[] = [
    {
      name: 'Strawberry Frappe',
      price: 150,
      image: '/images/Strawberry Frappe.webp',
      alt: 'Strawberry Frappe'
    },
    {
      name: 'Caramel Frappe',
      price: 150,
      image: '/images/Caramel Frappe.webp',
      alt: 'Caramel Frappe'
    },
    {
      name: 'White Frappe',
      price: 140,
      image: '/images/White Frappe.webp',
      alt: 'White Frappe'
    },
    {
      name: 'Affogato Frappe',
      price: 160,
      image: '/images/Affogato Frappe.webp',
      alt: 'Affogato Frappe'
    },
    {
      name: 'Creme Frappe',
      price: 130,
      image: '/images/Creme Frappe.png',
      alt: 'Creme Frappe'
    },
    {
      name: 'Java Frappe',
      price: 150,
      image: '/images/Java Frappe.webp',
      alt: 'Java Frappe'
    },
  ];

  espressoMenuItems: CarouselItem[] = [
    {
      name: 'Cafe Americano',
      price: 150,
      image: '/images/Espresso PNG/Cafe Americano.png',
      alt: 'Cafe Americano'
    },
    {
      name: 'Cappuccino',
      price: 130,
      image: '/images/Espresso PNG/Cappuccino.png',
      alt: 'Cappuccino'
    },
    {
      name: 'Cortado',
      price: 160,
      image: '/images/Espresso PNG/Cortado.png',
      alt: 'Cortado'
    },
    {
      name: 'Latte',
      price: 150,
      image: '/images/Espresso PNG/Latte.png',
      alt: 'Latte'
    },
    {
      name: 'Macchiato',
      price: 160,
      image: '/images/Espresso PNG/Macchiato.png',
      alt: 'Macchiato'
    },
    {
      name: 'Mocha',
      price: 100,
      image: '/images/Espresso PNG/Mocha.png',
      alt: 'Mocha'
    },
  ];

  pastriesMenuItems: CarouselItem[] = [
    {
      name: 'Brownies',
      price: 70,
      image: '/images/Pastries PNG/brownies.png',
      alt: 'Brownies'
    },
    {
      name: 'Cheescake',
      price: 130,
      image: '/images/Pastries PNG/cheescake.png',
      alt: 'Cheescake'
    },
    {
      name: 'Cookies',
      price: 60,
      image: '/images/Pastries PNG/cookies.png',
      alt: 'Cookies'
    },
    {
      name: 'Croissant',
      price: 90,
      image: '/images/Pastries PNG/Croissant.png',
      alt: 'Croissant'
    },
    {
      name: 'Muffins',
      price: 80,
      image: '/images/Pastries PNG/muffins.png',
      alt: 'Muffins'
    },
    {
      name: 'Strawberry Cake',
      price: 150,
      image: '/images/Pastries PNG/strawberry cake.png',
      alt: 'Strawberry Cake'
    },
  ];

  constructor(private google: GoogleApi, private router: Router, private cartService: CartService) {
    this.google.userProfileSubject.subscribe(info => this.userInfo = info);
  }

  ngOnInit() {
    this.cartService.checkoutSubject.subscribe(shouldCheckout => {
      if (shouldCheckout) {
        this.router.navigate(['/menu/checkout']).catch(() => {});
      }
    });
  }

  isLoggedIn(): boolean {
    return this.google.isLoggedIn();
  }

  logout() {
    this.google.SignOut();
    this.router.navigate(['/']).catch(() => {});
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GoogleApi, UserInfo } from '../../../shared/services/google-api.service';
import { Carousel, CarouselItem } from '../../../shared/components/carousel/carousel';
import { CartService } from '../../../shared/services/cart.service';
import { Footer } from '../../../shared/layouts/base-layout/footer/footer';
import { Navbar } from "../../../shared/layouts/base-layout/navbar/navbar";

@Component({
	selector: 'app-menu',
	standalone: true,
	imports: [CommonModule, Carousel, Footer, Navbar],
	templateUrl: './menu.html',
	styleUrls: ['./menu.css'],
})
export class Menu implements OnInit, OnDestroy {
	userInfo?: UserInfo;
	
	popularMenuItems: CarouselItem[] = [
		{
			name: 'Caramel Latte',
			price: 200,
			image: '/assets/images/caramel-latte.png',
			alt: 'Caramel Latte'
		},
		{
			name: 'Cold Brew Coffee',
			price: 150,
			image: '/assets/images/cold-brew.png',
			alt: 'Cold Brew Coffee'
		},
		{
			name: 'Iced Coffee',
			price: 100,
			image: '/assets/images/ice-coffee.png',
			alt: 'Iced Coffee'
		},
		{
			name: 'Strawberry Frappe',
			price: 150,
			image: '/assets/images/Strawberry Frappe.webp',
			alt: 'Strawberry Frappe'
		},
		{
			name: 'Caramel Macchiato',
			price: 160,
			image: '/assets/images/macchiato.png',
			alt: 'Caramel Macchiato'
		},
		{
			name: 'Caramel Frappe',
			price: 150,
			image: '/assets/images/Caramel Frappe.webp',
			alt: 'Caramel Frappe'
		}
	];

	frappeMenuItems: CarouselItem[] = [
		{
			name: 'Strawberry Frappe',
			price: 150,
			image: '/assets/images/Strawberry Frappe.webp',
			alt: 'Strawberry Frappe'
		},
		{
			name: 'Caramel Frappe',
			price: 150,
			image: '/assets/images/Caramel Frappe.webp',
			alt: 'Caramel Frappe'
		},
		{
			name: 'White Frappe',
			price: 140,
			image: '/assets/images/White Frappe.webp',
			alt: 'White Frappe'
		},
		{
			name: 'Affogato Frappe',
			price: 160,
			image: '/assets/images/Affogato Frappe.webp',
			alt: 'Affogato Frappe'
		},
		{
			name: 'Creme Frappe',
			price: 130,
			image: '/assets/images/Creme Frappe.png',
			alt: 'Creme Frappe'
		},
		{
			name: 'Java Frappe',
			price: 150,
			image: '/assets/images/Java Frappe.webp',
			alt: 'Java Frappe'
		}
	];

	espressoMenuItems: CarouselItem[] = [
		{
			name: 'Cafe Americano',
			price: 150,
			image: '/assets/images/Espresso PNG/Cafe Americano.png',
			alt: 'Cafe Americano'
		},
		{
			name: 'Cappuccino',
			price: 130,
			image: '/assets/images/Espresso PNG/Cappuccino.png',
			alt: 'Cappuccino'
		},
		{
			name: 'Cortado',
			price: 160,
			image: '/assets/images/Espresso PNG/Cortado.png',
			alt: 'Cortado'
		},
		{
			name: 'Latte',
			price: 150,
			image: '/assets/images/Espresso PNG/Latte.png',
			alt: 'Latte'
		},
		{
			name: 'Macchiato',
			price: 160,
			image: '/assets/images/Espresso PNG/Macchiato.png',
			alt: 'Macchiato'
		},
		{
			name: 'Mocha',
			price: 100,
			image: '/assets/images/Espresso PNG/Mocha.png',
			alt: 'Mocha'
		}
	];

	pastriesMenuItems: CarouselItem[] = [
		{
			name: 'Brownies',
			price: 70,
			image: '/assets/images/Pastries PNG/brownies.png',
			alt: 'Brownies'
		},
		{
			name: 'Cheescake',
			price: 130,
			image: '/assets/images/Pastries PNG/cheescake.png',
			alt: 'Cheescake'
		},
		{
			name: 'Cookies',
			price: 60,
			image: '/assets/images/Pastries PNG/cookies.png',
			alt: 'Cookies'
		},
		{
			name: 'Croissant',
			price: 90,
			image: '/assets/images/Pastries PNG/Croissant.png',
			alt: 'Croissant'
		},
		{
			name: 'Muffins',
			price: 80,
			image: '/assets/images/Pastries PNG/muffins.png',
			alt: 'Muffins'
		},
		{
			name: 'Strawberry Cake',
			price: 150,
			image: '/assets/images/Pastries PNG/strawberry cake.png',
			alt: 'Strawberry Cake'
		}
	];

	constructor(private google: GoogleApi, private router: Router, private cartService: CartService) {
		this.google.userProfileSubject.subscribe(info => this.userInfo = info);
	}

	ngOnInit() {
		document.body.classList.add('menu-page');
		this.cartService.checkoutSubject.subscribe(shouldCheckout => {
			if (shouldCheckout) {
				this.router.navigate(['/menu/checkout']).catch(() => {});
			}
		});
	}

	ngOnDestroy() {
		document.body.classList.remove('menu-page');
	}

	isLoggedIn(): boolean {
		return this.google.isLoggedIn();
	}

	logout() {
		this.google.SignOut();
		this.router.navigate(['/']).catch(() => {});
	}
}
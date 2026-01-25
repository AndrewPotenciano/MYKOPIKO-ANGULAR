import { Component, HostListener, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

export interface CarouselItem {
	name: string;
	price: number;
	image: string;
	alt: string;
}

let carouselCounter = 0;

@Component({
	selector: 'app-carousel',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './carousel.html',
	styleUrls: ['./carousel.css']
})
export class Carousel implements OnInit {
	
	title = input<string>('Popular Menu');
	items = input<CarouselItem[]>([]);
	showDownHint = input(false);
	showSeparator = input(true);
	reveal = input(false);
	carouselId: string = `productsCarousel${++carouselCounter}`;
	private isMobile = false;

	constructor(public cart: CartService) {}

	ngOnInit() {
		this.updateViewport();
	}

	@HostListener('window:resize')
	onResize() {
		this.updateViewport();
	}

	private updateViewport() {
		this.isMobile = typeof window !== 'undefined' && window.innerWidth <= 767;
	}

	addToCart(item: CarouselItem) {
		this.cart.add({ name: item.name, price: item.price, quantity: 1, img: item.image });
		this.cart.open();
	}

	get slides(): CarouselItem[][] {
		const items = this.items();
		if (!items.length) return [];
		if (this.isMobile) {
			return [items];
		}
		const chunkSize = 3;
		const slides = [];
		for (let i = 0; i < items.length; i += chunkSize) {
			slides.push(items.slice(i, i + chunkSize));
		}
		return slides;
	}
}
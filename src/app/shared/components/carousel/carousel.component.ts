import { Component, Input } from '@angular/core';
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
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.css']
})
export class Carousel {
	@Input() title: string = 'Popular Menu';
	@Input() items: CarouselItem[] = [];
	carouselId: string = `productsCarousel${++carouselCounter}`;

	constructor(public cart: CartService) {}

	addToCart(item: CarouselItem) {
		this.cart.add({ name: item.name, price: item.price, quantity: 1, img: item.image });
		this.cart.open();
	}

	get slides(): CarouselItem[][] {
		const chunkSize = 3;
		const slides = [];
		for (let i = 0; i < this.items.length; i += chunkSize) {
			slides.push(this.items.slice(i, i + chunkSize));
		}
		return slides;
	}
}
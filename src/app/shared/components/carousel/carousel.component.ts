import { Component, HostListener, OnInit, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CarouselItem } from '../../models/carousel-item.model';

let carouselCounter = 0;
@Component({
	selector: 'app-carousel',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './carousel.component.html',
	styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
	
	title = input<string>('Popular Menu');
	items = input<CarouselItem[]>([]);
	showDownHint = input(false);
	showSeparator = input(true);
	reveal = input(false);
	carouselId: string = `productsCarousel${++carouselCounter}`;
	private isMobile = false;

	public cart = inject(CartService);

	ngOnInit(): void {
		this.updateViewport();
	}

	@HostListener('window:resize')
	onResize(): void {
		this.updateViewport();
	}

	private updateViewport(): void {
		this.isMobile = typeof window !== 'undefined' && window.innerWidth <= 767;
	}

	addToCart(item: CarouselItem): void {
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
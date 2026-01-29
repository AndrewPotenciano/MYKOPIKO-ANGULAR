import { Component, HostListener, OnInit, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CarouselItem } from '../../models/carousel-item.model';
import { ToastModalComponent } from '../toast-modal/toast-modal.component';

let carouselCounter = 0;
@Component({
	selector: 'app-carousel',
	standalone: true,
	imports: [CommonModule, ToastModalComponent],
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
	toastOpen = false;
	toastMessage = '';

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
		this.toastMessage = 'Added to cart';
		this.toastOpen = true;
	}

	onToastClose() {
		this.toastOpen = false;
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
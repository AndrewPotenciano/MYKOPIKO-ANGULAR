import { Component, HostListener, OnInit, input, inject, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
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
export class CarouselComponent implements OnInit, AfterViewInit {
	title = input<string>('Popular Menu');
	items = input<CarouselItem[]>([]);
	showDownHint = input(false);
	showSeparator = input(true);
	reveal = input(false);
	carouselId: string = `productsCarousel${++carouselCounter}`;
	isMobile = false;

	public cart = inject(CartService);
	toastOpen = false;
	toastMessage = '';
	showSwipeHint = true;

	@ViewChild('carouselRow') carouselRow?: ElementRef<HTMLDivElement>;

	ngOnInit(): void {
		this.updateViewport();
	}

	ngAfterViewInit(): void {
		this.attachScrollListener();
	}

	@HostListener('window:resize')
	onResize(): void {
		this.updateViewport();
		this.attachScrollListener();
	}

	private updateViewport(): void {
		this.isMobile = typeof window !== 'undefined' && window.innerWidth <= 767;
	}

	private attachScrollListener(): void {
		if (this.isMobile && this.carouselRow) {
			const element = this.carouselRow.nativeElement;
			element.addEventListener('scroll', () => this.onScroll(element));
		}
	}

	private onScroll(element: HTMLDivElement): void {
		const scrollLeft = element.scrollLeft;
		const scrollWidth = element.scrollWidth;
		const clientWidth = element.clientWidth;
		
		// Hide swipe hint when near the end (within 50px)
		this.showSwipeHint = scrollLeft < scrollWidth - clientWidth - 50;
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
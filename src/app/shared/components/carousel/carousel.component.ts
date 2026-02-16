import { Component, HostListener, OnInit, input, inject, AfterViewInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { CarouselItem } from '../../models/carousel-item.model';
import { ToastService } from '../toast/toast.service';

let carouselCounter = 0;
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
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
  private toastService = inject(ToastService);
  showSwipeHint = true;

  private cartItems = toSignal(
    this.cart.items$.pipe(
      map(items => {
        const qtyMap = new Map<string, number>();
        items.forEach(item => qtyMap.set(item.name, item.quantity));
        return qtyMap;
      })
    ),
    { initialValue: new Map<string, number>() }
  );

  getItemQuantity(itemName: string): number {
    return this.cartItems().get(itemName) ?? 0;
  }

  ngOnInit(): void {
    this.updateViewport();
  }

  ngAfterViewInit(): void { }

  @HostListener('window:resize')
  onResize(): void {
    this.updateViewport();
  }

  private updateViewport(): void {
    this.isMobile = typeof window !== 'undefined' && window.innerWidth <= 767;
  }

  onScroll(target: EventTarget | null): void {
    if (!this.isMobile || !target) return;
    const element = target as HTMLElement;
    const scrollLeft = element.scrollLeft;
    const scrollWidth = element.scrollWidth;
    const clientWidth = element.clientWidth;

    this.showSwipeHint = scrollLeft < scrollWidth - clientWidth - 30;
  }

  addToCart(item: CarouselItem): void {
    this.cart.add({ name: item.name, price: item.price, quantity: 1, img: item.image });
    this.toastService.show(`${item.name} added to cart`);
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

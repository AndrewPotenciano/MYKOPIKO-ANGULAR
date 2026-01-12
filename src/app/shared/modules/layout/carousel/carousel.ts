import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  styleUrl: './carousel.css'
})
export class Carousel {
  @Input() title: string = 'Popular Menu';
  @Input() items: CarouselItem[] = [];
  carouselId: string = `productsCarousel${++carouselCounter}`;

  // Split items into chunks for carousel slides
  get slides(): CarouselItem[][] {
    const chunkSize = 3;
    const slides = [];
    for (let i = 0; i < this.items.length; i += chunkSize) {
      slides.push(this.items.slice(i, i + chunkSize));
    }
    return slides;
  }
}

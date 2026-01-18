import { Component } from '@angular/core';
import { Carousel, CarouselItem } from '../../shared/components/carousel/carousel.component';
import { Footer } from '../../shared/components/footer/footer.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { RouterLink } from "@angular/router";

interface ContactForm {
	name: string;
	email: string;
	message: string;
}

@Component({
	selector: 'app-home',
	imports: [FormsModule, CommonModule, Footer, Carousel],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class Home {
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
			   price: 180,
			   image: '/images/caramel-macchiato.png',
			   alt: 'Caramel Macchiato'
		   }
	   ];
	}
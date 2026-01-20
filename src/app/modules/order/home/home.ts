import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Carousel, CarouselItem } from '../../../shared/components/carousel/carousel';
import { Footer } from '../../../shared/layouts/base-layout/footer/footer';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from '@emailjs/browser';
import { RouterLink } from '@angular/router';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';


interface ContactForm {
	name: string;
	email: string;
	message: string;
}

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [FormsModule, CommonModule, Footer, Carousel, RouterLink,NgxTrimDirectiveModule],
	templateUrl: './home.html',
	styleUrls: ['./home.css'],
})
export class Home implements AfterViewInit, OnDestroy {
	private revealObserver?: IntersectionObserver;
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

	frappMenuItems: CarouselItem[] = [
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

	form: ContactForm = {
		name: '',
		email: '',
		message: ''
	};

	scrollTo(event: Event, id: string) {
		event.preventDefault();
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	}

	onSubmit(form: NgForm) {
		if (form.invalid) {
			Object.values(form.controls).forEach(control => {
				control.markAsTouched();
			});
			return;
		}

		this.send();
	}

	send() {
		emailjs.send('service_u35oe9x', 'template_iejhg7f', { ...this.form }, 'VjtiOX-nmb9M7CHQ0').then(() => {
			alert('Message sent successfully!');
			this.form = { name: '', email: '', message: '' };
		});
	}

	ngAfterViewInit() {
		const targets = document.querySelectorAll('.scroll-reveal');
		if (!('IntersectionObserver' in window)) {
			targets.forEach((el) => el.classList.add('is-visible'));
			return;
		}

		this.revealObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						(entry.target as HTMLElement).classList.add('is-visible');
						this.revealObserver?.unobserve(entry.target);
					}
				});
			},
			{
				threshold: 0.15,
				rootMargin: '0px 0px -10% 0px'
			}
		);

		targets.forEach((el) => this.revealObserver?.observe(el));
	}

	ngOnDestroy() {
		this.revealObserver?.disconnect();
	}
}
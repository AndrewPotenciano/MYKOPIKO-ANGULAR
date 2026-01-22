import { AfterViewInit, Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Carousel, CarouselItem } from '../../../shared/components/carousel/carousel';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import emailjs from '@emailjs/browser';
import { RouterLink } from '@angular/router';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { MenuService } from '../../../shared/services/menu.service';

interface ContactForm {
	name: string;
	email: string;
	message: string;
}

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [FormsModule, CommonModule, Carousel, RouterLink, NgxTrimDirectiveModule, HttpClientModule],
	templateUrl: './home.html',
	styleUrls: ['./home.css'],
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
	private revealObserver?: IntersectionObserver;
	popularMenuItems: CarouselItem[] = [];
	frappeMenuItems: CarouselItem[] = [];
	espressoMenuItems: CarouselItem[] = [];
	pastriesMenuItems: CarouselItem[] = [];

	form: ContactForm = {
		name: '',
		email: '',
		message: ''
	};

	constructor(
		private menuService: MenuService,
		private cdr: ChangeDetectorRef
	) {}

	ngOnInit() {
		this.menuService.getPopularMenu().subscribe((data: any) => {
			this.popularMenuItems = data as any;
			this.cdr.detectChanges();
		});
		this.menuService.getFrappeMenu().subscribe((data: any) => {
			this.frappeMenuItems = data as any;
			this.cdr.detectChanges();
		});
		this.menuService.getEspressoMenu().subscribe((data: any) => {
			this.espressoMenuItems = data as any;
			this.cdr.detectChanges();
		});
		this.menuService.getPastriesMenu().subscribe((data: any) => {
			this.pastriesMenuItems = data as any;
			this.cdr.detectChanges();
		});
	}

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
		const targets = document.querySelectorAll('.scroll-reveal, #menu, .reviews-section');
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
	
formatFullName() {
  if (!this.form.name) return;
  this.form.name = this.form.name
    .trim()
    .toLowerCase()
    .replace(/(^|\s)\S/g, (char: string) => char.toUpperCase());
}
}


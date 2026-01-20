import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartService } from '../../../services/cart.service';
import { GoogleApi } from '../../../services/google-api.service';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [CommonModule, RouterModule],
	templateUrl: './navbar.html',
	styleUrls: ['./navbar.css']
})
export class Navbar {
	isNavOpen = false;
	isLoginRoute = false;
	isMenuRoute = false;
	constructor(private cart: CartService, private router: Router, private google: GoogleApi) {
		// set initial value
		this.isLoginRoute = this.router.url.includes('/login');
		this.isMenuRoute = this.router.url.includes('/menu');
		// update on navigation end
		this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
			this.isLoginRoute = this.router.url.includes('/login');
			this.isMenuRoute = this.router.url.includes('/menu');
		});
	}

	toggleNav() {
		this.isNavOpen = !this.isNavOpen;
	}

	closeNav() {
		this.isNavOpen = false;
	}

	scrollTo(event: Event, id: string) {
		event.preventDefault();
		this.closeNav();
		
		// If not on home page, navigate to home first
		if (!this.router.url.includes('/') || this.router.url !== '/') {
			this.router.navigate(['/'], { fragment: id }).then(() => {
				// Scroll after navigation
				setTimeout(() => {
					const el = document.getElementById(id);
					if (el) {
						el.scrollIntoView({ behavior: 'smooth', block: 'start' });
					}
				}, 100);
			});
		} else {
			// Already on home page, just scroll
			const el = document.getElementById(id);
			if (el) {
				el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}
	}

	openCart(event: Event) {
		event.preventDefault();
		this.cart.open();
	}

	isLoggedIn(): boolean {
		return this.google.isLoggedIn();
	}

	logout() {
		this.google.SignOut();
		this.closeNav();
		this.router.navigate(['/']).catch(() => {});
	}
}
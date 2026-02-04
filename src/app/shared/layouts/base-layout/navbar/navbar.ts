import { Component, inject, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartService } from '../../../services/cart.service';
import { GoogleApi } from '../../../services/google-api.service';
import { LABELS } from '@shared/constants/label.const';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  public readonly LABELS = LABELS;
  isNavOpen = false;
  isLoginRoute = false;
  isMenuRoute = false;
  isUserDropdownOpen = false;
  private cart = inject(CartService);
  private router = inject(Router);
  private google = inject(GoogleApi);
  private eRef = inject(ElementRef);
  constructor() {
    // set initial value
    this.isLoginRoute = this.router.url.includes('/login');
    this.isMenuRoute = this.router.url.includes('/menu');
    // update on navigation end
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.isLoginRoute = this.router.url.includes('/login');
      this.isMenuRoute = this.router.url.includes('/menu');
      this.isNavOpen = false;
    });
  }

  toggleNav(): void {
    this.isNavOpen = !this.isNavOpen;
  }

  closeNav(): void {
    this.isNavOpen = false;
  }

  toggleUserDropdown(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isUserDropdownOpen = false;
    }
  }

  scrollTo(event: Event, id: string): void {
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

  openCart(event: Event): void {
    event.preventDefault();
    this.cart.open();
  }

  isLoggedIn(): boolean {
    return this.google.isLoggedIn();
  }

  async logout(): Promise<void> {
    this.isUserDropdownOpen = false;
    await this.google.signOut();
    this.closeNav();
    this.router.navigate(['/']).catch(() => { });
  }
}

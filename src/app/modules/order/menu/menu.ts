import { Component, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { GoogleApi, UserInfo } from '../../../shared/services/google-api.service';
import { CarouselComponent} from '../../../shared/components/';
import { CartService } from '../../../shared/services/cart.service';
import { MenuService } from '../../../shared/services/menu.service';
import { CarouselItem } from  '../../../shared/models/carousel-item.model';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, CarouselComponent, HttpClientModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
})
export class Menu implements OnInit, AfterViewInit, OnDestroy {
  userInfo?: UserInfo;
  showLogoutModal = false;
  private revealObserver?: IntersectionObserver;

  private google = inject(GoogleApi);
  private router = inject(Router);
  private cartService = inject(CartService);
  private menuService = inject(MenuService);
  private cdr = inject(ChangeDetectorRef);

  popularMenuItems: CarouselItem[] = [];
  frappeMenuItems: CarouselItem[] = [];
  espressoMenuItems: CarouselItem[] = [];
  pastriesMenuItems: CarouselItem[] = [];

  constructor() {
    this.google.userProfileSubject.subscribe(info => this.userInfo = info);
  }

  ngOnInit(): void {
    document.body.classList.add('menu-page');

    this.menuService.getPopularMenu().subscribe((data) => {
      this.popularMenuItems = data;
      this.cdr.detectChanges();
    });
    
    this.menuService.getFrappeMenu().subscribe((data) => {
      this.frappeMenuItems = data;
      this.cdr.detectChanges();
    });
    this.menuService.getEspressoMenu().subscribe((data) => {
      this.espressoMenuItems = data;
      this.cdr.detectChanges();
    });
    this.menuService.getPastriesMenu().subscribe((data) => {
      this.pastriesMenuItems = data;
      this.cdr.detectChanges();
    });

    this.cartService.checkoutSubject.subscribe(shouldCheckout => {
      if (shouldCheckout) {
        this.router.navigate(['/menu/checkout']).catch(() => {});
      }
    });
  }

  ngAfterViewInit(): void {
    const targets = document.querySelectorAll('.scroll-reveal');
    if ('IntersectionObserver' in window) {
      this.revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).classList.add('is-visible');
              this.revealObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
      );
      targets.forEach((el) => this.revealObserver?.observe(el));
    } else {
      targets.forEach((el) => (el as HTMLElement).classList.add('is-visible'));
    }
  }

  ngOnDestroy(): void {
    document.body.classList.remove('menu-page');
    this.revealObserver?.disconnect();
  }

  isLoggedIn(): boolean {
    return this.google.isLoggedIn();
  }

  openLogoutModal(): void {
    this.showLogoutModal = true;
  }

  closeLogoutModal(): void {
    this.showLogoutModal = false;
  }

  confirmLogout(): void {
    this.showLogoutModal = false;
    this.google.SignOut()
      .then(() => this.router.navigate(['/']))
      .catch(() => this.router.navigate(['/']));
  }
}

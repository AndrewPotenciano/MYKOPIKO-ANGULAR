import { Component, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { GoogleApi, UserInfo } from '../../../shared/services/google-api.service';
import { Carousel, CarouselItem } from '../../../shared/components/carousel/carousel';
import { CartService } from '../../../shared/services/cart.service';
import { MenuService } from '../../../shared/services/menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, Carousel, HttpClientModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
})
export class Menu implements OnInit, AfterViewInit, OnDestroy {
  userInfo?: UserInfo;
  showLogoutModal = false;
  private revealObserver?: IntersectionObserver;

  popularMenuItems: CarouselItem[] = [];
  frappeMenuItems: CarouselItem[] = [];
  espressoMenuItems: CarouselItem[] = [];
  pastriesMenuItems: CarouselItem[] = [];

  constructor(
    private google: GoogleApi,
    private router: Router,
    private cartService: CartService,
    private menuService: MenuService,
    private cdr: ChangeDetectorRef
  ) {
    this.google.userProfileSubject.subscribe(info => this.userInfo = info);
  }

  ngOnInit() {
    document.body.classList.add('menu-page');
    // Load menus from json-server
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

    this.cartService.checkoutSubject.subscribe(shouldCheckout => {
      if (shouldCheckout) {
        this.router.navigate(['/menu/checkout']).catch(() => {});
      }
    });
  }

  ngAfterViewInit() {
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

  ngOnDestroy() {
    document.body.classList.remove('menu-page');
    this.revealObserver?.disconnect();
  }

  isLoggedIn(): boolean {
    return this.google.isLoggedIn();
  }

  openLogoutModal() {
    this.showLogoutModal = true;
  }

  closeLogoutModal() {
    this.showLogoutModal = false;
  }

  confirmLogout() {
    this.showLogoutModal = false;
    this.google.SignOut()
      .then(() => this.router.navigate(['/']))
      .catch(() => this.router.navigate(['/']));
  }
}

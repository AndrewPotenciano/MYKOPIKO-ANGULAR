import { Component, OnDestroy, OnInit, AfterViewInit, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GoogleApi, UserInfo, MenuService } from '@shared/services';
import { CarouselComponent } from '@shared/components';
import { MenuItem, CarouselItem } from '@shared/models';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, CarouselComponent, HttpClientModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
})
export class Menu implements OnInit, AfterViewInit, OnDestroy {
  userInfo?: UserInfo;
  private revealObserver?: IntersectionObserver;

  private google = inject(GoogleApi);
  private router = inject(Router);
  private menuService = inject(MenuService);
  private destroyRef = inject(DestroyRef);

  popularMenuItems: CarouselItem[] = [];
  frappeMenuItems: CarouselItem[] = [];
  espressoMenuItems: CarouselItem[] = [];
  pastriesMenuItems: CarouselItem[] = [];

  constructor() {
    this.google.userProfileSubject
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(info => this.userInfo = info);
  }

  ngOnInit(): void {
    document.body.classList.add('menu-page');

    this.menuService.getPopularMenu()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.popularMenuItems = data;
      });

    this.menuService.getFrappeMenu()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.frappeMenuItems = data;
      });

    this.menuService.getEspressoMenu()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.espressoMenuItems = data;
      });

    this.menuService.getPastriesMenu()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.pastriesMenuItems = data;
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
}

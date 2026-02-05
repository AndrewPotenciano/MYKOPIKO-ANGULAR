import { Component, OnDestroy, OnInit, AfterViewInit, DestroyRef, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GoogleApi, UserInfo, MenuService } from '@shared/services';
import { CarouselComponent } from '@shared/components';
import { CarouselItem } from '@shared/models';
import { LABELS } from '@shared/constants/label.const';
import { MESSAGES } from '@shared/constants/message.const';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, CarouselComponent],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
})
export class Menu implements OnInit, AfterViewInit, OnDestroy {
  public readonly LABELS = LABELS;
  public readonly MESSAGES = MESSAGES;
  userInfo?: UserInfo;
  private revealObserver?: IntersectionObserver;

  private google = inject(GoogleApi);

  private menuService = inject(MenuService);
  private destroyRef = inject(DestroyRef);

  popularMenuItems: CarouselItem[] = [];
  frappeMenuItems: CarouselItem[] = [];
  espressoMenuItems: CarouselItem[] = [];
  pastriesMenuItems: CarouselItem[] = [];

  headerSlides = [
    {
      image: 'assets/images/coffee-shop3.jpg',
      title: MESSAGES.MENU_HEADER_TITLE,
      subtitle: MESSAGES.MENU_HEADER_SUBTITLE
    },
    {
      image: 'assets/images/coffee-shop4.jpg',
      title: 'Where every cup tells a story.',
      subtitle: 'Crafted with care, enjoyed with soul.'
    },
    {
      image: 'assets/images/baristas.jpg',
      title: 'Serve happiness in every cup.',
      subtitle: 'Brewed with care, shared with joy.'
    }
  ];
  currentHeaderIndex = 0;
  private autoSlideInterval?: any;

  constructor() {
    this.google.userProfileSubject.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((info) => (this.userInfo = info));
  }

  setCurrentHeader(index: number): void {
    this.currentHeaderIndex = index;
    this.resetAutoSlide();
  }

  private cdr = inject(ChangeDetectorRef);

  startAutoSlide(): void {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.currentHeaderIndex = (this.currentHeaderIndex + 1) % this.headerSlides.length;
      this.cdr.detectChanges(); // Force update
    }, 3000); // Reduced to 3s for better visibility
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = undefined;
    }
  }

  resetAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  ngOnInit(): void {
    document.body.classList.add('menu-page');
    this.startAutoSlide();

    this.menuService
      .getPopularMenu()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.popularMenuItems = data;
      });

    this.menuService
      .getFrappeMenu()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.frappeMenuItems = data;
      });

    this.menuService
      .getEspressoMenu()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.espressoMenuItems = data;
      });

    this.menuService
      .getPastriesMenu()
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
        { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
      );
      targets.forEach((el) => this.revealObserver?.observe(el));
    } else {
      targets.forEach((el) => (el as HTMLElement).classList.add('is-visible'));
    }
  }

  ngOnDestroy(): void {
    document.body.classList.remove('menu-page');
    this.revealObserver?.disconnect();
    this.stopAutoSlide();
  }

  isLoggedIn(): boolean {
    return this.google.isLoggedIn();
  }
}

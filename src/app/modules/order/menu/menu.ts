import { Component, OnDestroy, OnInit, AfterViewInit, DestroyRef, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GoogleApi, UserInfo, MenuService } from '@shared/services';
import { CarouselComponent, ScrollToTopComponent } from '@shared/components';
import { CarouselItem } from '@shared/models';
import { LABELS } from '@shared/constants/label.const';
import { MESSAGES } from '@shared/constants/message.const';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, CarouselComponent, ScrollToTopComponent],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css'],
})
export class Menu implements OnInit, AfterViewInit, OnDestroy {
  public readonly LABELS = LABELS;
  public readonly MESSAGES = MESSAGES;
  userInfo?: UserInfo;

  private google = inject(GoogleApi);
  private menuService = inject(MenuService);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  popularMenuItems$: Observable<CarouselItem[]> = this.menuService.getPopularMenu();
  frappeMenuItems$: Observable<CarouselItem[]> = this.menuService.getFrappeMenu();
  espressoMenuItems$: Observable<CarouselItem[]> = this.menuService.getEspressoMenu();
  pastriesMenuItems$: Observable<CarouselItem[]> = this.menuService.getPastriesMenu();

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

  startAutoSlide(): void {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.currentHeaderIndex = (this.currentHeaderIndex + 1) % this.headerSlides.length;
      this.cdr.detectChanges();

    }, 3000);
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
  }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void {
    document.body.classList.remove('menu-page');
    this.stopAutoSlide();
  }

  isLoggedIn(): boolean {
    return this.google.isLoggedIn();
  }
}

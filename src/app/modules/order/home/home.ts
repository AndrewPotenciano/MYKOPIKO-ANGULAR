import { AfterViewInit, Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MenuService } from '../../../shared/services/menu.service';
import { ReviewService } from '../../../shared/services/review.service';
import { ReviewCardComponent } from '../../../shared/components/review-card/review-card.component';
import {ReactiveFormsModule,FormBuilder,FormGroup,Validators,AbstractControl,} from '@angular/forms';
import emailjs from '@emailjs/browser';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { Review } from '../../../shared/models/review.model';
import { CarouselItem } from '../../../shared/models/carousel-item.model';
import { inject } from '@angular/core';
import{ LowercaseOnBlurDirective } from '../../../shared/directives/lowercase-on-blur.directive';
import{ TitleCaseOnBlurDirective } from '../../../shared/directives/title-case-on-blur.directive';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    RouterLink,
    HttpClientModule,
    ReviewCardComponent,
    ReactiveFormsModule,
    NgxTrimDirectiveModule,
    LowercaseOnBlurDirective,
    TitleCaseOnBlurDirective,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  private revealObserver?: IntersectionObserver;

  popularMenuItems: CarouselItem[] = [];
  frappeMenuItems: CarouselItem[] = [];
  espressoMenuItems: CarouselItem[] = [];
  pastriesMenuItems: CarouselItem[] = [];
  reviews: Review[] = [];
  contactForm!: FormGroup;

private menuService = inject(MenuService);
private reviewService = inject(ReviewService);
private cdr = inject(ChangeDetectorRef);
private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });

    // Fetch menu items
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

    // Fetch reviews
    this.reviewService.getAllReviews().subscribe((data) => {
      this.reviews = data;
      this.cdr.detectChanges();
    });
  }

  // Scroll helper
  scrollTo(event: Event, id: string): void {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Send contact form via EmailJS
  send(): void {
    if (this.contactForm.invalid) return;

    emailjs
      .send('service_u35oe9x', 'templateF_iejhg7f', this.contactForm.value, 'VjtiOX-nmb9M7CHQ0')
      .then(() => {
        alert('Message sent successfully!');
        this.contactForm.reset();
      });
  }

  ngAfterViewInit(): void {
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
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );

    targets.forEach((el) => this.revealObserver?.observe(el));
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
  }

  // Reactive form getters for template
  get name(): AbstractControl | null {
    return this.contactForm?.get('name');
  }
  get email(): AbstractControl | null {
    return this.contactForm?.get('email');
  }
  get message(): AbstractControl | null {
    return this.contactForm?.get('message');
  }
}

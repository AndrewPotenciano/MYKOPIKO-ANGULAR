import { AfterViewInit, Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CarouselComponent, ReviewCardComponent, MessageModalComponent } from '@shared/components';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MenuService, ReviewService } from '@shared/services';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { Review, MenuItem, CarouselItem } from '@shared/models';
import { inject } from '@angular/core';
import { LowercaseOnBlurDirective, TitleCaseOnBlurDirective } from '@shared/directives';
import { LABELS } from '@shared/constants/label.const';
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
    MessageModalComponent,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  public readonly LABELS = LABELS;
  messageModalOpen = false;
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

    });

    this.menuService.getFrappeMenu().subscribe((data) => {
      this.frappeMenuItems = data;
    });

    this.menuService.getEspressoMenu().subscribe((data) => {
      this.espressoMenuItems = data;
    });

    this.menuService.getPastriesMenu().subscribe((data) => {
      this.pastriesMenuItems = data;
    });

    // Fetch reviews
    this.reviewService.getAllReviews().subscribe((data) => {
      this.reviews = data;
      this.cdr.detectChanges();
      // Re-setup observers after reviews are loaded
      setTimeout(() => this.setupScrollReveal(), 0);
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
      .send('service_u35oe9x', 'template_iejhg7f', this.contactForm.value, 'VjtiOX-nmb9M7CHQ0')
      .then(() => {
        this.messageModalOpen = true;
        this.contactForm.reset();
      })
  }

  ngAfterViewInit(): void {
    this.setupScrollReveal();
  }

  private setupScrollReveal(): void {

    if (this.revealObserver) {
      this.revealObserver.disconnect();
    }

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
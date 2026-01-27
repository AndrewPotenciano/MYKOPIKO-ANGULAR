import { AfterViewInit, Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MenuService } from '../../../shared/services/menu.service';
import { ReviewCardComponent } from '../../../shared/components/review-card/review-card.component';
import {ReactiveFormsModule,FormBuilder,FormGroup,Validators,AbstractControl,} from '@angular/forms';
import emailjs from '@emailjs/browser';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { Review } from '../../../shared/models/review.model';
import { CarouselItem } from '../../../shared/models/carousel-item.model';
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
  contactForm!: FormGroup;

  reviews: Review[] = [
    {
      name: 'Andrew',
      title: 'Rich espresso taste',
      comment: 'Masarap sobra yung espresso, hindi mapait at sakto yung timpla.',
      image: '/assets/images/PNG MENU/andrew.jpg',
      starsImage: '/assets/images/5 star.PNG',
    },
    {
      name: 'Dexter',
      title: 'Good value for money',
      comment: 'Okay yung presyo at mabilis yung service kahit peak hours.',
      image: '/assets/images/PNG MENU/dexter.jpg',
      starsImage: '/assets/images/4 star.PNG',
    },
    {
      name: 'Kylle',
      title: 'Refreshing drinks',
      comment: 'Hindi sobrang tamis yung frappes, perfect pang-chill.',
      image: '/assets/images/PNG MENU/kylle.jpg',
      starsImage: '/assets/images/3 star.PNG',
    },
    {
      name: 'Jason',
      title: 'Relaxing atmosphere',
      comment: 'Tahimik yung place at sarap tambayan habang nagkakape.',
      image: '/assets/images/PNG MENU/jason.webp',
      starsImage: '/assets/images/4 star.PNG',
    },
  ];

  constructor(
    private menuService: MenuService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    // Initialize reactive form
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

  formatFullName(): void {
    const nameControl = this.contactForm.get('name');
    if (!nameControl?.value) return;
    const formatted = nameControl.value
      .trim()
      .toLowerCase()
      .replace(/(^|\s)\S/g, (char: string) => char.toUpperCase());
    nameControl.setValue(formatted);
  }

  formatEmail(): void {
  const emailControl = this.contactForm.get('email');
  if (!emailControl?.value) return;

  const formatted = emailControl.value
    .trim()
    .toLowerCase(); // just lowercase, no title case

  emailControl.setValue(formatted);
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

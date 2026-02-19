import { AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarouselComponent, ReviewCardComponent, MessageModalComponent, ScrollToTopComponent } from '@shared/components';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuService, ReviewService } from '@shared/services';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { NgxTrimDirectiveModule } from 'ngx-trim-directive';
import { LowercaseOnBlurDirective, TitleCaseOnBlurDirective } from '@shared/directives';
import { LABELS } from '@shared/constants/label.const';
import { MESSAGES } from '@shared/constants/message.const';
import { ValidationMessagePipe } from '@shared/pipes/validation-message.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CarouselComponent,
    RouterLink,
    ReviewCardComponent,
    ReactiveFormsModule,
    NgxTrimDirectiveModule,
    LowercaseOnBlurDirective,
    TitleCaseOnBlurDirective,
    MessageModalComponent,
    ScrollToTopComponent,
    ValidationMessagePipe,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  public readonly LABELS = LABELS;
  public readonly MESSAGES = MESSAGES;
  messageModalOpen = false;
  modalMessage = '';
  isSending = false;
  contactForm!: FormGroup;
  submitted = false;

  private menuService = inject(MenuService);
  private reviewService = inject(ReviewService);
  private fb = inject(FormBuilder);

  popularMenuItems = toSignal(this.menuService.getPopularMenu(), { initialValue: [] });
  frappeMenuItems = toSignal(this.menuService.getFrappeMenu(), { initialValue: [] });
  espressoMenuItems = toSignal(this.menuService.getEspressoMenu(), { initialValue: [] });
  pastriesMenuItems = toSignal(this.menuService.getPastriesMenu(), { initialValue: [] });
  reviews = toSignal(this.reviewService.getAllReviews(), { initialValue: [] });

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  send(): void {
    this.submitted = true;
    if (this.contactForm.invalid || this.isSending) return;

    this.isSending = true;
    this.modalMessage = 'Sending your message...';
    this.messageModalOpen = true;

    emailjs.send('service_u35oe9x', 'template_iejhg7f', this.contactForm.value, 'VjtiOX-nmb9M7CHQ0')
      .then(() => {
        this.modalMessage = 'Message sent successfully!';
        this.contactForm.reset();
        this.submitted = false;
        this.isSending = false;
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        this.modalMessage = 'Failed to send message. Please try again.';
        this.isSending = false;
      });
  }

  ngAfterViewInit(): void { }

  ngOnDestroy(): void { }

  get name(): AbstractControl | null { return this.contactForm?.get('name'); }
  get email(): AbstractControl | null { return this.contactForm?.get('email'); }
  get message(): AbstractControl | null { return this.contactForm?.get('message'); }
}

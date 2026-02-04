import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GoogleApi } from '@shared/services';
import { LABELS } from '@shared/constants/label.const';
import { MESSAGES } from '@shared/constants/message.const';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  public readonly LABELS = LABELS;
  public readonly MESSAGES = MESSAGES;
  public google = inject(GoogleApi);
  private router = inject(Router);

  ngOnInit(): void {
    if (this.google.isLoggedIn()) {
      this.router.navigate(['/order']);
      return;
    }

    this.google.userProfileSubject.subscribe(() => {
      this.router.navigate(['/order']);
    });
  }

  loginWithGoogle(event: Event): void {
    event.preventDefault();
    this.google.login('/order');
  }
}

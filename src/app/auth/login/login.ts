import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleApi } from '../../google-api';
import {Footer} from '../../shared/modules/layout/footer/footer';

@Component({
  selector: 'app-login',
  imports: [Footer],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  constructor(private google: GoogleApi, private router: Router) {}

  ngOnInit(): void {
    // when profile arrives after successful OAuth callback, navigate to /menu
    this.google.userProfileSubject.subscribe(() => {
      this.router.navigate(['/menu']);
    });
  }

  loginWithGoogle(event: Event) {
    event.preventDefault();
    this.google.login('/menu');
  }

}

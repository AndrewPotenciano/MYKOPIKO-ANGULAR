import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GoogleApi } from '../../../shared/services/google-api.service';
import { Footer } from '../../../shared/layouts/base-layout/footer/footer';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule, Footer],
	templateUrl: './login.html',
	styleUrls: ['./login.css'],
})
export class Login {
	constructor(public google: GoogleApi, private router: Router) {}

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
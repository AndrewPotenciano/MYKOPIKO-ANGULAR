import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleApi } from '../../../core/auth/google-api.service';
import { Footer } from '../../../shared/components/footer/footer.component';

@Component({
	selector: 'app-login',
	imports: [Footer],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
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
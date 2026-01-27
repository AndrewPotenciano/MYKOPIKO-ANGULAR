import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GoogleApi } from '../../../shared/services/google-api.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './login.html',
	styleUrls: ['./login.css'],
})
export class Login {
	public google = inject(GoogleApi);
	private router = inject(Router);

	ngOnInit(): void {
		this.google.userProfileSubject.subscribe(() => {
			this.router.navigate(['/menu']);
		});
	}

	loginWithGoogle(event: Event): void {
		event.preventDefault();
		this.google.login('/menu');
	}
}
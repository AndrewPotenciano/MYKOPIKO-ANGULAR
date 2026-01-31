import { Injectable, inject } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const oAuthConfig: AuthConfig = {
	issuer: 'https://accounts.google.com',
	strictDiscoveryDocumentValidation: false,
	redirectUri: window.location.origin,
	clientId: '875929516460-gk6acnr1bdujd4p4lna0go1ge4pftet9.apps.googleusercontent.com',
	scope: 'openid profile email'
};

export interface UserInfo {
	info: {
		sub: string;
		email: string;
		name: string;
		picture: string;
	};
}

@Injectable({
	providedIn: 'root',
})
export class GoogleApi {
	userProfileSubject = new Subject<UserInfo>();
	private readonly oAuthService = inject(OAuthService);
	private readonly router = inject(Router);
	constructor() {
		this.oAuthService.configure(oAuthConfig);
		this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
			if (this.oAuthService.hasValidAccessToken()) {
				this.oAuthService.loadUserProfile().then(userprofile => {
					this.userProfileSubject.next({ info: userprofile } as UserInfo);
					const redirect = sessionStorage.getItem('post_login_redirect');
					if (redirect) {
						sessionStorage.removeItem('post_login_redirect');
						this.router.navigate([redirect]);
					}
				});
			}
		});
	}

	isLoggedIn(): boolean {
		return this.oAuthService.hasValidAccessToken();
	}

	async SignOut(): Promise<void> {
		try {
			await this.oAuthService.revokeTokenAndLogout();
		} catch {
			this.oAuthService.logOut();
		}
	}

	login(redirect?: string): void {
		if (redirect) {
			sessionStorage.setItem('post_login_redirect', redirect);
		}
		this.oAuthService.initLoginFlow();
	}

	getUserProfile(): UserInfo['info'] | null {
		if (!this.isLoggedIn()) {
			return null;
		}
		const profile = this.oAuthService.getIdentityClaims();
		return profile ? profile as UserInfo['info'] : null;
	}
}
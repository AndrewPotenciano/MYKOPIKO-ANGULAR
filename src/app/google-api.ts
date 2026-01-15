import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '875929516460-gk6acnr1bdujd4p4lna0go1ge4pftet9.apps.googleusercontent.com',
  scope: 'openid profile email'
}

export interface UserInfo {
  info:{
    sub: string;
    email: string;
    name: string;
    picture: string;
  }
}

@Injectable({
  providedIn: 'root',
})
export class GoogleApi {
  userProfileSubject = new Subject<UserInfo>();
  constructor(private readonly oAuthService: OAuthService, private readonly router: Router) {
    // Configure the OAuth service but do NOT auto-initiate login flow here.
    this.oAuthService.configure(oAuthConfig);
    // Load discovery document and try to parse tokens on return (callback handling)
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oAuthService.hasValidAccessToken()) {
        this.oAuthService.loadUserProfile().then(userprofile => {
          // normalize and emit profile under `info` to match consumers
          this.userProfileSubject.next({ info: userprofile } as UserInfo);
          // navigate to stored redirect (if any)
          const redirect = sessionStorage.getItem('post_login_redirect');
          if (redirect) {
            sessionStorage.removeItem('post_login_redirect');
            this.router.navigateByUrl(redirect).catch(() => {});
          }
        });
      }
    });
  }

  isLoggedIn( ): boolean {
    return this.oAuthService.hasValidAccessToken();
}
  SignOut(){
    this.oAuthService.logOut();
  }

  // Trigger the OAuth login flow (call from UI click)
  login(target?: string): void {
    // store target path so we can restore after redirect
    if (target) {
      try { sessionStorage.setItem('post_login_redirect', target); } catch {}
    }
    this.oAuthService.initLoginFlow();
  }
}

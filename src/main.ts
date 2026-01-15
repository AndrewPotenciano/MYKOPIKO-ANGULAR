import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core'; // ✅ CORRECT
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(OAuthModule.forRoot()) // ✅ works now
  ]
}).catch(err => console.error(err));

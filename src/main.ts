import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // navbar toggler

bootstrapApplication(App, {
  providers: [
    provideRouter(routes) // only the router is needed here
  ]
}).catch(err => console.error(err));

import { Routes } from '@angular/router';
import { BaseLayout } from './shared/modules/layout/base-layout/base-layout';
import { Home } from './features/home/home';
import { Menu } from './features/home/menu/menu';
import { AboutUs } from './features/home/about-us/about-us';
import { ContactUs } from './features/home/contact-us/contact-us';

export const routes: Routes = [
  {
    path: '',
    component: BaseLayout,  // <-- wraps all pages
    children: [
      { path: '', component: Home },
      { path: 'menu', component: Menu },
      { path: 'about-us', component: AboutUs },
      { path: 'contact-us', component: ContactUs }
    ]
  }
];

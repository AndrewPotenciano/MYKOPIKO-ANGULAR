import { Routes } from '@angular/router';
import { BaseLayout } from './shared/modules/layout/base-layout/base-layout';
import { Home } from './features/home/home';
import { Login } from './auth/login/login';
import { Menu } from './menu/menu';
import { Checkout } from './menu/checkout/checkout';
import { Payment } from './menu/payment/payment';
import { Finish } from './menu/finish/finish';
import { Track } from './menu/track/track';

export const routes: Routes = [
  {
    path: '',
    component: BaseLayout,  
    children: [
      { path: '', component: Home },
     { path: 'login', component: Login },
     { path: 'menu', component: Menu },
     { path: 'menu/checkout', component: Checkout },
     { path: 'menu/payment', component: Payment },
     { path: 'menu/finish', component: Finish },
     { path: 'menu/track', component: Track },
    {path: 'error', component: Error}]
  }
];

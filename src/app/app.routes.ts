import { Routes } from '@angular/router';
import { BaseLayout } from './shared/layouts/base-layout/base-layout';
import { Home } from './modules/order/home/home';
import { Login } from './modules/auth/login/login';
import { Menu } from './modules/order/menu/menu';
import { Checkout } from './modules/order/checkout/checkout';
import { Payment } from './modules/order/payment/payment';
import { Finish } from './modules/order/finish/finish';
import { Track } from './modules/order/track/track';

import { orderGuard } from './core/guards/order.guard';
import { postOrderGuard } from './core/guards/post-order.guard';

export const routes: Routes = [
  {
    path: '',
    component: BaseLayout,
    children: [
      { path: '', component: Home },
      { path: 'login', component: Login },
      { path: 'menu', component: Menu },
      { path: 'menu/checkout', component: Checkout, canActivate: [postOrderGuard] },
      { path: 'menu/payment', component: Payment, canActivate: [postOrderGuard] },
      { path: 'menu/finish', component: Finish },
      { path: 'menu/track', component: Track, canActivate: [orderGuard] }
    ]
  }
];

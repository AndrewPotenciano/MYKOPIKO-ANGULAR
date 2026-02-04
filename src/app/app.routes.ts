import { Routes } from '@angular/router';
import { BaseLayout } from './shared/layouts/base-layout/base-layout';
import { orderGuard } from './core/guards/order.guard';
import { postOrderGuard } from './core/guards/post-order.guard';

export const routes: Routes = [
  {
    path: '',
    component: BaseLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./modules/order/home/home').then((m) => m.Home),
      },
      {
        path: 'login',
        loadComponent: () => import('./modules/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'menu',
        children: [
          {
            path: '',
            loadComponent: () => import('./modules/order/menu/menu').then((m) => m.Menu),
          },
          {
            path: 'checkout',
            loadComponent: () => import('./modules/order/checkout/checkout').then((m) => m.Checkout),
            canActivate: [postOrderGuard],
          },
          {
            path: 'payment',
            loadComponent: () => import('./modules/order/payment/payment').then((m) => m.Payment),
            canActivate: [postOrderGuard],
          },
          {
            path: 'finish',
            loadComponent: () => import('./modules/order/finish/finish').then((m) => m.Finish),
          },
          {
            path: 'track',
            loadComponent: () => import('./modules/order/track/track').then((m) => m.Track),
            canActivate: [orderGuard],
          },
        ],
      },
    ],
  },
];

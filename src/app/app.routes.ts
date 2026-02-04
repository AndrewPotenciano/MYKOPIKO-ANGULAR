import { Routes } from '@angular/router';
import { BaseLayout } from './shared/layouts/base-layout/base-layout';


export const routes: Routes = [
  {
    path: '', component: BaseLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('./modules/home/home').then((m) => m.Home),
      },
      {
        path: 'login',
        loadComponent: () => import('./modules/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'order',
        loadChildren: () => import('./modules/order/order.routes').then((m) => m.ORDER_ROUTES),
      },
    ],
  },
];

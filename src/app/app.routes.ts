import { Routes } from '@angular/router';
import { BaseLayout } from './shared/layouts/base-layout/base-layout';
import { Home } from './modules/home/home';


export const routes: Routes = [
  {
    path: '', component: BaseLayout,
    children: [
      {
        path: '',
        component: Home,
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

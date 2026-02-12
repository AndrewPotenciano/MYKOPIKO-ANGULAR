import { Routes } from '@angular/router';
import { postOrderGuard } from '../../core/guards/post-order.guard';

export const ORDER_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./menu/menu').then((m) => m.Menu),
    },
    {
        path: 'checkout',
        loadComponent: () => import('./checkout/checkout').then((m) => m.Checkout),
        canActivate: [postOrderGuard],
    },
    {
        path: 'payment',
        loadComponent: () => import('./payment/payment').then((m) => m.Payment),
        canActivate: [postOrderGuard],
    },
    {
        path: 'finish',
        loadComponent: () => import('./finish/finish').then((m) => m.Finish),

    },
    {
        path: 'track',
        loadComponent: () => import('./track/track').then((m) => m.Track),
    },

];

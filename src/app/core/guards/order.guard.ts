import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const orderGuard: CanActivateFn = () => {
    const router = inject(Router);
    const hasOrder = localStorage.getItem('last_order_id');

    if (hasOrder) {
        return true;
    } else {
        router.navigate(['/']);
        return false;
    }
};

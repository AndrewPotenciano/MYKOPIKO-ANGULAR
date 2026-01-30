import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const orderGuard: CanActivateFn = () => {
    const router = inject(Router);
    const latestOrder = localStorage.getItem('latestOrder');

    if (latestOrder) {
        return true;
    } else {
        router.navigate(['/']);
        return false;
    }
};

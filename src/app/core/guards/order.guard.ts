import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { OrderService } from '@shared/services';
import { map, of } from 'rxjs';

export const orderGuard: CanActivateFn = () => {
    const router = inject(Router);
    const orderService = inject(OrderService);

    const orderId = localStorage.getItem('last_order_id');
    const isFinished = localStorage.getItem('is_order_finished') === 'true';

    if (!orderId || !isFinished) {
        router.navigate(['/']);
        return of(false);
    }

    // Verify order still exists in database (in case db was cleared)
    return orderService.getOrderById(orderId).pipe(
        map(order => {
            if (order) {
                return true;
            } else {
                // If order not found in DB, cleanup local storage
                localStorage.removeItem('last_order_id');
                localStorage.removeItem('is_order_finished');
                router.navigate(['/']);
                return false;
            }
        })
    );
};

import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { CartService } from '@shared/services';

export const postOrderGuard: CanActivateFn = () => {
  const router = inject(Router);
  const cart = inject(CartService);

  const isFinished = localStorage.getItem('is_order_finished') === 'true';
  const hasItems = cart.items && cart.items.length > 0;

  // If cart is empty, user shouldn't be attempting to checkout or pay
  if (!hasItems) {
    // If they already finished an order, take them to track
    if (isFinished) {
      router.navigate(['/menu/track']);
      return false;
    }
    // Otherwise send back to menu to add items
    router.navigate(['/menu']);
    return false;
  }

  // If they have items, allow access (handles both normal flow and starting new order)
  return true;
};

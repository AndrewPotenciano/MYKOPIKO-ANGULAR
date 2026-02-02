import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { OrderService } from '@shared/services';
import { map, of } from 'rxjs';

export const orderGuard: CanActivateFn = () => {
    return true;
};


import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, tap, finalize, map } from 'rxjs/operators';
import { Order } from '../models';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private readonly apiUrl = 'http://localhost:3000/orders';
    private readonly http = inject(HttpClient);

    private readonly loadingSubject = new BehaviorSubject<boolean>(false);
    readonly loading$ = this.loadingSubject.asObservable();

    private readonly errorSubject = new BehaviorSubject<string | null>(null);
    readonly error$ = this.errorSubject.asObservable();

    /**
     * Create a new order via POST
     */
    createOrder(order: Order): Observable<Order> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.post<Order>(this.apiUrl, order).pipe(
            catchError((error) => {
                console.error('Failed to create order:', error);
                this.errorSubject.next('Failed to submit order. Please try again.');
                throw error;
            }),
            finalize(() => this.loadingSubject.next(false))
        );
    }

    /**
     * Get all orders for a specific customer email
     */
    getUserOrders(email: string): Observable<Order[]> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.get<Order[]>(`${this.apiUrl}?customerInfo.email=${email}`).pipe(
            catchError((error) => {
                console.error('Failed to fetch orders:', error);
                this.errorSubject.next('Failed to load orders.');
                return of([]);
            }),
            finalize(() => this.loadingSubject.next(false))
        );
    }

    /**
     * Get all orders (for admin or general tracking)
     */
    getAllOrders(): Observable<Order[]> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.get<Order[]>(this.apiUrl).pipe(
            map(orders => orders.sort((a, b) => {
                return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
            })),
            catchError((error) => {
                console.error('Failed to fetch all orders:', error);
                this.errorSubject.next('Failed to load orders.');
                return of([]);
            }),
            finalize(() => this.loadingSubject.next(false))
        );
    }

    /**
     * Get a single order by ID
     */
    getOrderById(id: string | number): Observable<Order | null> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        return this.http.get<Order>(`${this.apiUrl}/${id}`).pipe(
            catchError((error) => {
                console.error('Failed to fetch order:', error);
                this.errorSubject.next('Order not found.');
                return of(null);
            }),
            finalize(() => this.loadingSubject.next(false))
        );
    }

    /**
     * Generate order number
     */
    generateOrderNumber(): string {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `ORD-${year}${month}${day}-${random}`;
    }
}

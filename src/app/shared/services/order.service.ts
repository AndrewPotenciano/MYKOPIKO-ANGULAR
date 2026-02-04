import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { Order } from '../models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly apiUrl = 'http://localhost:3000/orders';
  private readonly http = inject(HttpClient);

  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loadingSubject.asObservable();

  private readonly errorSubject = new BehaviorSubject<string | null>(null);
  readonly error$ = this.errorSubject.asObservable();

  private isLoading = false;

  createOrder(order: Order): Observable<Order> {
    if (this.isLoading) return of();

    this.isLoading = true;
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.post<Order>(this.apiUrl, order).pipe(
      tap((savedOrder) => console.log('Order created successfully:', savedOrder)),
      catchError((error) => {
        console.error('Failed to create order:', error);
        this.errorSubject.next(error?.message || 'Failed to submit order. Please try again.');
        return throwError(() => error);
      }),
      finalize(() => {
        this.isLoading = false;
        this.loadingSubject.next(false);
      }),
    );
  }

  getUserOrders(email: string): Observable<Order[]> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.get<Order[]>(`${this.apiUrl}?customerInfo.email=${email}`).pipe(
      catchError((error) => {
        console.error('Failed to fetch orders:', error);
        this.errorSubject.next('Failed to load orders.');
        return of([]);
      }),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  getOrderById(id: string | number): Observable<Order | null> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.get<Order>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Failed to fetch order:', error);
        this.errorSubject.next('Order not found.');
        return of(null);
      }),
      finalize(() => this.loadingSubject.next(false)),
    );
  }

  updateOrder(id: string | number, data: Partial<Order>): Observable<Order> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.http.patch<Order>(`${this.apiUrl}/${id}`, data).pipe(
      tap((updatedOrder) => console.log('Order updated:', updatedOrder)),
      catchError((error) => {
        console.error('Failed to update order:', error);
        this.errorSubject.next('Failed to update order information.');
        return throwError(() => error);
      }),
      finalize(() => this.loadingSubject.next(false)),
    );
  }
  generateOrderNumber(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    return `ORD-${year}${month}${day}-${random}`;
  }
}

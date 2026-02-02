import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { MenuItem, MenuCategory } from '../models';
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly apiUrl = 'http://localhost:3000/menu';
  private readonly http = inject(HttpClient);

  private readonly menuDataSubject = new BehaviorSubject<MenuItem[]>([]);
  readonly menuData$ = this.menuDataSubject.asObservable();

  private readonly loadingSubject = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loadingSubject.asObservable();

  private readonly errorSubject = new BehaviorSubject<string | null>(null);
  readonly error$ = this.errorSubject.asObservable();

  private isLoading = false;

  constructor() {
    this.loadMenuData();
  }

  private loadMenuData(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.loadingSubject.next(true);
    this.errorSubject.next(null);
    this.http.get<MenuItem[]>(this.apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Failed to load menu data:', error);
          this.errorSubject.next('Failed to load menu data. Please try again later.');
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
          this.loadingSubject.next(false);
        })
      )
      .subscribe(data => {
        if (data) {
          this.menuDataSubject.next(data);
        }
      });
  }

  private getFilteredMenu(category: MenuCategory): Observable<MenuItem[]> {
    return this.menuData$.pipe(
      map(data => data.filter(item => item.category === category))
    );
  }

  getPopularMenu(): Observable<MenuItem[]> {
    return this.getFilteredMenu('popular');
  }

  getFrappeMenu(): Observable<MenuItem[]> {
    return this.getFilteredMenu('frappe');
  }

  getEspressoMenu(): Observable<MenuItem[]> {
    return this.getFilteredMenu('espresso');
  }

  getPastriesMenu(): Observable<MenuItem[]> {
    return this.getFilteredMenu('pastries');
  }

  refreshMenu(): void {
    this.loadMenuData();
  }
}

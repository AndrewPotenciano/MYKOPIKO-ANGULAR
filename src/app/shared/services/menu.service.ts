import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { CarouselItem } from '../models/carousel-item.model';

export interface MenuItem extends CarouselItem {
  id: number;
  description?: string;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuDataSubject = new BehaviorSubject<MenuItem[]>([]);
  private menuData$ = this.menuDataSubject.asObservable().pipe(shareReplay(1));

  private http = inject(HttpClient);

  constructor() {
    this.loadMenuData();
  }

      private apiUrl = "http://localhost:3000/menu";

  private loadMenuData(): void {
    this.http.get<MenuItem[]>(this.apiUrl)
      .subscribe(data => {
        this.menuDataSubject.next(data);
      });
  }

  private getFilteredMenu(category: string): Observable<MenuItem[]> {
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

  getAllMenu(): Observable<MenuItem[]> {
    return this.menuData$;
  }
}

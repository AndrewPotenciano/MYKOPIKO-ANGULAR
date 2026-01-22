import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string;
  alt: string;
  category?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuDataSubject = new BehaviorSubject<MenuItem[]>([]);
  private menuData$ = this.menuDataSubject.asObservable().pipe(shareReplay(1));

  constructor(private http: HttpClient) {
    this.loadMenuData();
  }

  private loadMenuData(): void {
    this.http.get<MenuItem[]>('/assets/menu-data.json')
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

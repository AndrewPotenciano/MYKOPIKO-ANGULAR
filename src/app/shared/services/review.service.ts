import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private reviewDataSubject = new BehaviorSubject<Review[]>([]);
  private reviewData$ = this.reviewDataSubject.asObservable().pipe(shareReplay(1));

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/reviews';

  constructor() {
    this.loadReviewData();
  }

  private loadReviewData(): void {
    this.http.get<Review[]>(this.apiUrl).subscribe((data) => {
      this.reviewDataSubject.next(data);
    });
  }

  getAllReviews() {
    return this.reviewData$;
  }
}

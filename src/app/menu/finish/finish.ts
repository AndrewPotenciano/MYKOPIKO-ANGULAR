import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finish',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './finish.html',
  styleUrls: ['./finish.css'],
})
export class Finish implements OnInit {
  orderNumber = '';
  
  constructor(private router: Router) {}

  ngOnInit() {
    // Generate order number
    this.orderNumber = 'ORD' + Date.now();
  }

  trackOrder() {
    // Navigate to track order page
    this.router.navigate(['/menu/track']).catch(() => {});
  }

  backHome() {
    this.router.navigate(['/']).catch(() => {});
  }
}

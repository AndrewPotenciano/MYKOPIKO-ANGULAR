import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Footer } from '../../shared/modules/layout/footer/footer';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface RiderInfo {
  name: string;
  phone: string;
  image: string;
}

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [CommonModule, Footer],
  templateUrl: './track.html',
  styleUrl: './track.css',
})
export class Track implements OnInit {

  mapUrl!: SafeResourceUrl; 

  riderInfo: RiderInfo = {
    name: 'Andrew James',
    phone: '09755957203',
    image: '/images/PNG MENU/andrew.jpg'
  };

  trackSteps = [
    { icon: 'coffee', label: 'Preparing Your Order', completed: true },
    { icon: 'truck', label: 'Out For Delivery', completed: true },
    { icon: 'box', label: 'Delivered', completed: false }
  ];

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer 
  ) {}

  ngOnInit() {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.242073642938!2d121.05874907362166!3d14.585277477454598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c816c53ed657%3A0x368fa762e1111364!2sThe%20Orient%20Square%2C%20F.%20Ortigas%20Jr.%20Rd%2C%20Ortigas%20Center%2C%20Pasig%2C%201600%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1768383205196!5m2!1sen!2sph'
    );

    this.simulateTracking();
  }

  simulateTracking() {}

  callRider() {
    alert(`Calling ${this.riderInfo.name} at ${this.riderInfo.phone}`);
    window.location.href = `tel:${this.riderInfo.phone}`;
  }

  goBack() {
    this.router.navigate(['/menu/finish']).catch(() => {});
  }
}

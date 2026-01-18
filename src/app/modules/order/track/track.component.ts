import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Footer } from '../../../shared/components/footer/footer.component';
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
	templateUrl: './track.component.html',
	styleUrls: ['./track.component.css'],
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

	ngOnInit(): void {
		// Add your initialization logic here if needed
	}

	goBack() {
		this.router.navigate(['/menu']).catch(() => {});
	}
}
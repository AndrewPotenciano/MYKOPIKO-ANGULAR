import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { CartModal } from '../../components/cart-modal/cart-modal.component';
import { Footer } from './footer/footer';

@Component({
	selector: 'app-base-layout',
	standalone: true,
	imports: [CommonModule, RouterOutlet, Navbar, CartModal, Footer],
	templateUrl: './base-layout.html',
	styleUrls: ['./base-layout.css']
})
export class BaseLayout {}
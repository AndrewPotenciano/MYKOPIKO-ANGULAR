import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { CartModal } from '../Cart-modal/cart-modal.component';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar, CartModal],
  templateUrl: './base-layout.html',
  styleUrls: ['./base-layout.css']
})
export class BaseLayout {}

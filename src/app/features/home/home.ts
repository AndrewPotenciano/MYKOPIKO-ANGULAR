import { Component } from '@angular/core';
import { Carousel, CarouselItem } from '../../shared/modules/layout/carousel/carousel';
import { Footer } from '../../shared/modules/layout/footer/footer';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-home',
  imports: [Carousel, Footer, FormsModule,CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  

  popularMenuItems: CarouselItem[] = [
    {
      name: 'Caramel Latte',
      price: 200,
      image: '/images/caramel-latte.png',
      alt: 'Caramel Latte'
    },
    {
      name: 'Cold Brew Coffee',
      price: 150,
      image: '/images/cold-brew.png',
      alt: 'Cold Brew Coffee'
    },
    {
      name: 'Iced Coffee',
      price: 100,
      image: '/images/ice-coffee.png',
      alt: 'Iced Coffee'
    },
    {
      name: 'Strawberry Frappe',
      price: 150,
      image: '/images/Strawberry Frappe.webp',
      alt: 'Strawberry Frappe'
    },
    {
      name: 'Caramel Macchiato',
      price: 160,
      image: '/images/macchiato.png',
      alt: 'Caramel Macchiato'
    },
    {
      name: 'Caramel Frappe',
      price: 150,
      image: '/images/Caramel Frappe.webp',
      alt: 'Caramel Frappe'
    }
  ];

  frappMenuItems: CarouselItem[] = [
    {
      name: 'Strawberry Frappe',
      price: 150,
      image: '/images/Strawberry Frappe.webp',
      alt: 'Strawberry Frappe'
    },
    {
      name: 'Caramel Frappe',
      price: 150,
      image: '/images/Caramel Frappe.webp',
      alt: 'Caramel Frappe'
    },
    {
      name: 'White Frappe',
      price: 140,
      image: '/images/White Frappe.webp',
      alt: 'White Frappe'
    },
    {
      name: 'Affogato Frappe',
      price: 160,
      image: '/images/Affogato Frappe.webp',
      alt: 'Affogato Frappe'
    },

    {
      name: 'Creme Frappe',
      price: 130,
      image: '/images/Creme Frappe.png',
      alt: 'Creme Frappe'
    },

    {
      name: 'Java Frappe',
      price: 150,
      image: '/images/Java Frappe.webp',
      alt: 'Java Frappe'
    },
  ];

  espressoMenuItems: CarouselItem[] = [
    {
      name: 'Cafe Americano',
      price: 150,
      image: '/images/Espresso PNG/Cafe Americano.png',
      alt: 'Cafe Americano'
    },
    {
      name: 'Cappuccino',
      price: 130,
      image: '/images/Espresso PNG/Cappuccino.png',
      alt: 'Cappuccino'
    },
    {
      name: 'Cortado',
      price: 160,
      image: '/images/Espresso PNG/Cortado.png',
      alt: 'Cortado'
    },
    {
      name: 'Latte',
      price: 150,
      image: '/images/Espresso PNG/Latte.png',
      alt: 'Latte'
    },

    {
      name: 'Macchiato',
      price: 160,
      image: '/images/Espresso PNG/Macchiato.png',
      alt: 'Macchiato'
    },

    {
      name: 'Mocha',
      price: 100,
      image: '/images/Espresso PNG/Mocha.png',
      alt: 'Mocha'
    },
  ];

  pastriesMenuItems: CarouselItem[] = [
    {
      name: 'Brownies',
      price: 70,
      image: '/images/Pastries PNG/brownies.png',
      alt: 'Brownies'
    },
    {
      name: 'Cheescake',
      price: 130,
      image: '/images/Pastries PNG/cheescake.png',
      alt: 'Cheescake'
    },
    {
      name: 'Cookies',
      price: 60,
      image: '/images/Pastries PNG/cookies.png',
      alt: 'Cookies'
    },
    {
      name: 'Croissant',
      price: 90,
      image: '/images/Pastries PNG/Croissant.png',
      alt: 'Croissant'
    },

    {
      name: 'Muffins',
      price: 80,
      image: '/images/Pastries PNG/muffins.png',
      alt: 'Muffins'
    },

    {
      name: 'Strawberry Cake',
      price: 150,
      image: '/images/Pastries PNG/strawberry cake.png',
      alt: 'Strawberry Cake'
    },
  ];

  scrollTo(event: Event, id: string) {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

onSubmit(form: NgForm) {
  if (form.invalid) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
    return; // ⛔ STOP if not all fields are filled
  }

  this.send(); // ✅ Only runs if form is valid
}
  form: ContactForm = {
    name: '',
    email: '',
    message: ''
  };
  

  send(){
   emailjs.send('service_u35oe9x', 'template_iejhg7f', {...this.form}, 
    'VjtiOX-nmb9M7CHQ0').then(() => {
      alert('Message sent successfully!');
      this.form = { name: '', email: '', message: '' };
    })
  }

}


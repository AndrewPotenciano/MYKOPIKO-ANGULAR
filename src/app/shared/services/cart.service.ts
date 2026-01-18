import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  img?: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSub = new BehaviorSubject<CartItem[]>([]);
  items$ = this.itemsSub.asObservable();
  cartSubject = this.itemsSub.asObservable();

  private modalOpenSub = new BehaviorSubject<boolean>(false);
  modalOpen$ = this.modalOpenSub.asObservable();

  private checkoutSub = new BehaviorSubject<boolean>(false);
  checkoutSubject = this.checkoutSub.asObservable();

  get items() {
    return this.itemsSub.getValue();
  }

  open() {
    this.modalOpenSub.next(true);
  }

  close() {
    this.modalOpenSub.next(false);
  }

  toggle() {
    this.modalOpenSub.next(!this.modalOpenSub.getValue());
  }

  checkout() {
    this.checkoutSub.next(true);
  }

  add(item: CartItem) {
    const items = this.itemsSub.getValue();
    const idx = items.findIndex(i => i.name === item.name);
    if (idx > -1) {
      items[idx].quantity += item.quantity;
    } else {
      items.push(item);
    }
    this.itemsSub.next([...items]);
  }

  updateQuantity(index: number, quantity: number) {
    const items = this.itemsSub.getValue();
    if (items[index]) {
      items[index].quantity = quantity;
      this.itemsSub.next([...items]);
    }
  }

  remove(index: number) {
    const items = this.itemsSub.getValue();
    items.splice(index, 1);
    this.itemsSub.next([...items]);
  }

  clear() {
    this.itemsSub.next([]);
  }
}

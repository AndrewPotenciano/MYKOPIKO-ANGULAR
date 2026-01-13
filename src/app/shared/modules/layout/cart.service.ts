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

  private modalOpenSub = new BehaviorSubject<boolean>(false);
  modalOpen$ = this.modalOpenSub.asObservable();

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

  add(item: CartItem) {
    const list = [...this.itemsSub.getValue()];
    const idx = list.findIndex(i => i.name === item.name);
    if (idx > -1) {
      list[idx].quantity += item.quantity;
    } else {
      list.push({ ...item });
    }
    this.itemsSub.next(list);
  }

  remove(index: number) {
    const list = [...this.itemsSub.getValue()];
    if (index >= 0 && index < list.length) {
      list.splice(index, 1);
      this.itemsSub.next(list);
    }
  }

  updateQuantity(index: number, qty: number) {
    const list = [...this.itemsSub.getValue()];
    if (index >= 0 && index < list.length) {
      list[index].quantity = Math.max(1, qty);
      this.itemsSub.next(list);
    }
  }

  clear() {
    this.itemsSub.next([]);
  }
}

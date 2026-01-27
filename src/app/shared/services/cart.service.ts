import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../../shared/models/cart-item.model';
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

  open(): void {
    this.modalOpenSub.next(true);
  }

  close(): void {
    this.modalOpenSub.next(false);
  }

  toggle(): void {
    this.modalOpenSub.next(!this.modalOpenSub.getValue());
  }

  checkout(): void {
    this.checkoutSub.next(true);
  }

  add(item: CartItem): void {
    const items = this.itemsSub.getValue();
    const idx = items.findIndex(i => i.name === item.name);
    if (idx > -1) {
      items[idx].quantity += item.quantity;
    } else {
      items.push(item);
    }
    this.itemsSub.next([...items]);
  }

  updateQuantity(index: number, quantity: number): void {
    const items = this.itemsSub.getValue();
    if (items[index]) {
      items[index].quantity = quantity;
      this.itemsSub.next([...items]);
    }
  }

  remove(index: number): void {
    const items = this.itemsSub.getValue();
    items.splice(index, 1);
    this.itemsSub.next([...items]);
  }

  clear(): void {
    this.itemsSub.next([]);
  }
}

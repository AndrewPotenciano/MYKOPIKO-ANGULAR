import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '@shared/models';
@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSub = new BehaviorSubject<CartItem[]>(this.load());
  items$ = this.itemsSub.asObservable();
  cartSubject = this.itemsSub.asObservable();

  private modalOpenSub = new BehaviorSubject<boolean>(false);
  modalOpen$ = this.modalOpenSub.asObservable();


  get items() {
    return this.itemsSub.getValue();
  }

  private load(): CartItem[] {
    const saved = localStorage.getItem('cart_items');
    return saved ? JSON.parse(saved) : [];
  }

  private save(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.itemsSub.getValue()));
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


  add(item: CartItem): void {
    const items = this.itemsSub.getValue();
    const idx = items.findIndex(i => i.name === item.name);
    if (idx > -1) {
      items[idx].quantity += item.quantity;
    } else {
      items.push(item);
    }
    this.itemsSub.next([...items]);
    this.save();
  }

  updateQuantity(index: number, quantity: number): void {
    const items = this.itemsSub.getValue();
    if (items[index]) {
      items[index].quantity = quantity;
      this.itemsSub.next([...items]);
      this.save();
    }
  }

  remove(index: number): void {
    const items = this.itemsSub.getValue();
    items.splice(index, 1);
    this.itemsSub.next([...items]);
    this.save();
  }

  clear(): void {
    this.itemsSub.next([]);
    this.save();
  }
}

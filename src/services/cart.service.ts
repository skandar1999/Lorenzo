import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/footer/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);

  constructor() {}

  // Get the cart items
  getCartItems() {
    return this.cartSubject.asObservable();
  }
  
  removeItemFromCart(item: Product) {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cartSubject.next(this.cartItems);
    }
  }
  // Add an item to the cart
  addItemToCart(item: any) {
    this.cartItems.push(item);
    this.cartSubject.next(this.cartItems);
  }

  getAllCartItems() {
    return this.cartItems;
  }


 
}
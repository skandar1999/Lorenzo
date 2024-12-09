import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/footer/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = []; // Ensure type safety
  private cartSubject = new BehaviorSubject<Product[]>([]);

  constructor() {}

  // Get the cart items as an observable
  getCartItems() {
    return this.cartSubject.asObservable();
  }

  // Check if the product is already in the cart (using 'id')
  // Use '_id' when checking for product existence
isProductInCart(productId: string): boolean {
  console.log('Checking product existence in cart', productId);
  return this.cartItems.some((item) => item._id === productId); // Match '_id'
}


  // Add an item to the cart
  addItemToCart(item: Product) {
    this.cartItems.push(item);
    this.cartSubject.next(this.cartItems);
  }

  // Remove an item from the cart (accept productId as number)
  removeItemFromCart(productId: string) {
    this.cartItems = this.cartItems.filter((item) => item._id !== productId); // Remove by _id
    this.cartSubject.next(this.cartItems);
  }
  
  

  // Get all cart items (synchronously)
  getAllCartItems(): Product[] {
    return this.cartItems;
  }
}

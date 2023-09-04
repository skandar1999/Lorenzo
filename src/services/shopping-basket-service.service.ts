import { Injectable } from '@angular/core';
import { Product } from 'src/app/footer/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingBasketServiceService {
  private basketItems: Product[] = [];

  constructor() { }


  addToBasket(product: Product) {
    this.basketItems.push(product);
  }

  // Remove a product from the basket
  removeFromBasket(product: Product) {
    const index = this.basketItems.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.basketItems.splice(index, 1);
    }
  }

  // Get all items in the basket
  getBasketItems() {
    return this.basketItems;
  }
}

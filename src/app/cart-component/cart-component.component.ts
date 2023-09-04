import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { Product } from '../footer/models/product';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.css']
})
export class CartComponentComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0; 

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Subscribe to the cart items
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotalAmount(); // Calculate prix

    });
  }

  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((total, item) => total + item.prix, 0);
  }

  getProductImageUrl(image: string): string {
    return `http://localhost:3000/uploads/${image}`; // Adjust the URL as needed
  } 

  removeItemFromCart(item: Product) {
    this.cartService.removeItemFromCart(item);
  }
  

}

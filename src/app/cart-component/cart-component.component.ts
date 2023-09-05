import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { Product } from '../footer/models/product';
import { ProductsService } from 'src/services/products.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommandeFormulaireComponent } from '../commande-formulaire/commande-formulaire.component';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.css']
})
export class CartComponentComponent implements OnInit {
  cartItems: any[] = [];
  totalAmount: number = 0; 
  bsModalRef: any;

  constructor(private cartService: CartService ,
    private productService : ProductsService ,
    private modalService: BsModalService,
    ) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
      this.calculateTotalAmount();

    });
  }

  calculateTotalAmount() {
    this.totalAmount = this.cartItems.reduce((total, item) => {
      // If the item has a promotion, add its promoprix, otherwise add its prix
      return total + (item.promotion ? item.promoprix : item.prix);
    }, 0);
  }
  

  getProductImageUrl(image: string): string {
    return `http://localhost:3000/uploads/${image}`; // Adjust the URL as needed
  } 

  removeItemFromCart(item: Product) {
    this.cartService.removeItemFromCart(item);
  }
  


  openConfirmDialog(): void {
    const selectedProductIds = this.cartItems.map((item) => item._id); // Assuming _id is the product ID

    this.bsModalRef = this.modalService.show(CommandeFormulaireComponent, {
      initialState: {
        productIds: selectedProductIds,
      },
    });
    
  }
  

}

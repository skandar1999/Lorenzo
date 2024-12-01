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
      return total + (item.promotion ? item.promoprix : item.prix);
    }, 0);
  }
  

  getProductImageUrl(image: string): string {
    return `http://localhost:3000/uploads/${image}`; 
  } 

  removeItemFromCart(item: Product) {
    this.cartService.removeItemFromCart(item);
  }
  


  openConfirmDialog(): void {
    const selectedProductIds = this.cartItems.map((item) => item._id);

    this.bsModalRef = this.modalService.show(CommandeFormulaireComponent, {
      initialState: {
        productIds: selectedProductIds,
      },
    });
    
  }
  

}

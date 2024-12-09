import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/services/products.service';
import { Product } from '../footer/models/product';
import { CartService } from 'src/services/cart.service';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productshop',
  templateUrl: './productshop.component.html',
  styleUrls: ['./productshop.component.css']
})
export class ProductshopComponent implements OnInit {
  product: any;
  allproducts: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.getProductDetails(productId);
      this.getProds();
    });
  }

  addToCart(product: any) {
    const productToAdd = { ...product, id: product._id }; // Map '_id' to 'id'
    
    if (this.authService.isloggedIn) {
        // Check if the product is already in the cart
        if (this.cartService.isProductInCart(productToAdd.id)) {
            Swal.fire({
                icon: 'warning',
                title: 'Product Already in Cart',
                text: 'This product is already in your cart.',
            });
        } else {
            // Add the product to the cart
            this.cartService.addItemToCart(productToAdd);
            Swal.fire({
                icon: 'success',
                title: 'Product Added',
                text: 'The product has been added to your cart!',
            });
        }
    } else {
        this.router.navigate(['/app-forbidden']);
    }
}

  getProductDetails(productId: string) {
    this.productService.getProductById(productId).subscribe(
      product => {
        this.product = product;
      },
      error => {
        console.error(error);
      }
    );
  }

  getProductImageUrl(image: string): string {
    return `http://localhost:3000/uploads/${image}`; // Adjust the URL as needed
  }

  getProds() {
    this.productService.getProducts().subscribe(
      prods => {
        console.log(prods);
        this.allproducts = prods; // Assign the products array directly
      },
      error => {
        console.error(error);
      }
    );
  }
}

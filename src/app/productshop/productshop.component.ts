import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/services/products.service';
import { Product } from '../footer/models/product';
import { CartService } from 'src/services/cart.service';
import { AuthService } from 'src/services/auth.service';


@Component({
  selector: 'app-productshop',
  templateUrl: './productshop.component.html',
  styleUrls: ['./productshop.component.css']
})
export class ProductshopComponent implements OnInit {
  product: any;
  allproducts: any[] = [];

  constructor(private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    public authService: AuthService,
    private router: Router ,

    ) { }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const productId = params['id'];
        this.getProductDetails(productId);
        this. getProds() 
      });
    }
    
    addToCart(product: Product) {
      if (this.authService.isloggedIn) { // Use your authentication service method here
        // User is logged in, add the product to the cart
        this.cartService.addItemToCart(product);
      } else {
        // User is not logged in, redirect to the login page
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

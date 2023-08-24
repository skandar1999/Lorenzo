import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-productshop',
  templateUrl: './productshop.component.html',
  styleUrls: ['./productshop.component.css']
})
export class ProductshopComponent implements OnInit {
  product: any;
  allproducts: any[] = [];

  constructor(private route: ActivatedRoute,
    private productService: ProductsService) { }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const productId = params['id'];
        this.getProductDetails(productId);
        this. getProds() 
      });
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

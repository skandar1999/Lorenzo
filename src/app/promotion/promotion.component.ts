import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  allproducts: any[] = [];
  product: any[] = [];


  constructor(private productservice :ProductsService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getProductsWithPromo(); 

  }



  getProductsWithPromo() {
    this.productservice.getProductsWithPromo().subscribe(
      prods => {
        console.log(prods);
        this.allproducts = prods; 
      },
      error => {
        console.error(error);
      }
    );
  }

  getProductImageUrl(image: string): string {
    return `http://localhost:3000/uploads/${image}`;
  }
    
  onProductSelected(product: any) {
    console.log('Selected Product:', product);
    if (product && product._id) {
        this.router.navigate(['/products', product._id]); 
    } else {
        console.log('Invalid product or missing product ID');
    }
}



}
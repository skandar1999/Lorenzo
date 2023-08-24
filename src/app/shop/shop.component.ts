import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  allproducts: any[] = [];
  product: any[] = [];


  constructor(private productservice :ProductsService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getproducts(); // Call the method to fetch products on component initialization

  }



  getproducts() {
    this.productservice.getProducts().subscribe(
      prods => {
        console.log(prods);
        this.allproducts = prods; // Assign the products array directly
      },
      error => {
        console.error(error);
      }
    );
  }

  getProductImageUrl(image: string): string {
    return `http://localhost:3000/uploads/${image}`; // Adjust the URL as needed
  }
    
  onProductSelected(product: any) {
    console.log('Selected Product:', product);
    if (product && product._id) {
        this.router.navigate(['/products', product._id]); // Use _id property
    } else {
        console.log('Invalid product or missing product ID');
    }
}


  


  }
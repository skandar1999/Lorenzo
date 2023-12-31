import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-pololist',
  templateUrl: './pololist.component.html',
  styleUrls: ['./pololist.component.css']
})
export class POLOlistComponent implements OnInit {

  allproducts: any[] = [];
  product: any[] = [];


  constructor(private productservice :ProductsService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getproductspolo(); // Call the method to fetch products on component initialization

  }

  getproductspolo() {
    this.productservice.getPOLO().subscribe(
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

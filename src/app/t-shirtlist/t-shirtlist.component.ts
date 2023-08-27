import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-t-shirtlist',
  templateUrl: './t-shirtlist.component.html',
  styleUrls: ['./t-shirtlist.component.css']
})
export class TShirtlistComponent implements OnInit {

  allproducts: any[] = [];
  product: any[] = [];


  constructor(private productservice :ProductsService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getproductTshirt(); // Call the method to fetch products on component initialization

  }

  getproductTshirt() {
    this.productservice.getTSHIRT().subscribe(
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

}

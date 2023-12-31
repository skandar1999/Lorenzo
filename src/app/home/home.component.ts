import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allproducts: any[] = [];

  constructor(private productservice :ProductsService) { }

  ngOnInit(): void {
    this.getFiles(); // Call the method to fetch products on component initialization

  }



  getFiles() {
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
    
  
  }






import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/services/products.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  product: any = {}; // Initialize an empty product object
  selectedFile: File | undefined;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  
  constructor(private productService: ProductsService) {}
  ngOnInit(): void {
  }


  onSubmit(): void {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('prix', this.product.prix);
    formData.append('description', this.product.description);
    formData.append('categorie', this.product.categorie);
    formData.append('image', this.selectedFile);

    this.productService.addProduct(formData)
      .subscribe(
        (response) => {
          console.log('Product added successfully:', response);
          this.successMessage = 'Product added successfully';

          // Handle success, e.g., show a success message or navigate to another page
        },
        (error) => {
          console.error('Error adding product:', error);
          this.errorMessage = 'Error adding product';

          // Handle error, e.g., display an error message
        }
      );
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}

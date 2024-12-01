import { ProductsService } from 'src/services/products.service';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product-dialog-component',
  templateUrl: './edit-product-dialog-component.component.html',
  styleUrls: ['./edit-product-dialog-component.component.css']
})
export class EditProductDialogComponentComponent implements OnInit {

  
  @Output() dialogClosed: EventEmitter<any> = new EventEmitter();
  productName!: string; // Define the productName property
  successMessage: string | null = null; // Initialize with null

  @Input() productData: any = {
    name: '',
    prix: '',
    promoprix: '',
    description: '',
    categorie: '',
    imageURL: '' // Add the imageURL property to hold the image URL
    // Add other properties here...
  };



  constructor(public bsModalRef: BsModalRef , private http: HttpClient,
    private productservice: ProductsService,) {}

  ngOnInit(): void {}

  confirmChanges(): void {
  
    this.bsModalRef.hide();
  }

  cancelChanges(): void {
    // Handle cancel action if needed
    this.bsModalRef.hide();
  }

  


  getProductImageUrl(image: string): string {
    return `http://localhost:3000/uploads/${image}`; // Adjust the URL as needed
  }

  saveChanges(): void {
    console.log('ProductData in saveChanges:', this.productData);
    
    if (this.productData._id) {
      this.productservice.updateProduct(this.productData._id, this.productData).subscribe(
        (response: any) => {
          console.log('Product updated successfully:', response);
          this.successMessage = 'Product updated successfully!';
  
          // Show SweetAlert for success
          Swal.fire({
            title: 'Success!',
            text: 'Product updated successfully!',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            this.dialogClosed.emit(this.productData); // Emit the updated product data
          });
        },
        (error: any) => {
          console.error('Error updating Product:', error);
          
          // Show SweetAlert for error
          Swal.fire({
            title: 'Error!',
            text: 'There was an error updating the product.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      );
    } else {
      console.error('Product id is undefined');
      
      // Optional: Notify if the product ID is undefined
      Swal.fire({
        title: 'Error!',
        text: 'Product ID is undefined.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
  
  

  
  

}

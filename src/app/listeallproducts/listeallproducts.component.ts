import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/services/products.service';
import { EditProductDialogComponentComponent } from '../edit-product-dialog-component/edit-product-dialog-component.component';
import { MatDialog } from '@angular/material/dialog';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SupprimeProductDialogComponentComponent } from '../supprime-product-dialog-component/supprime-product-dialog-component.component';

@Component({
  selector: 'app-listeallproducts',
  templateUrl: './listeallproducts.component.html',
  styleUrls: ['./listeallproducts.component.css']
})
export class ListeallproductsComponent implements OnInit {

  allproducts: any[] = [];
  product: any[] = [];
  deletedd: boolean = false;
  updatedProductData: any = {}; // Initialize with an empty object or set to appropriate initial values
  bsModalRef: any;


  constructor(
    private productservice: ProductsService,
    private router: Router,
    private modalService: BsModalService
  ) { }
  

  ngOnInit(): void {
    this.getproducts(); // Call the method to fetch products on component initialization

  }

  openEditDialog(product: any): void {
    this.bsModalRef = this.modalService.show(EditProductDialogComponentComponent, {
      initialState: {
        productData: product // Pass the selected product's data
      },
      class: 'modal-dialog-centered' // Optional: You can add classes for styling
    });

    this.bsModalRef.content?.onClose.subscribe((result: any) => {
      if (result) {
        // Handle any actions after the dialog is closed (if needed)
      }
    });
  }
  
onDeletee(product: any): void {
  this.bsModalRef = this.modalService.show(SupprimeProductDialogComponentComponent, {
    initialState: {
      productName: product.name,
    },
  });

  this.bsModalRef.content.onClose.subscribe((result: boolean) => {
    if (result === true) {
      // User confirmed delete action
      this.productservice.supprimerProduct(product._id).subscribe(
        response => {
          // Handle success
          // Refresh the list of products or perform other actions
        },
        error => {
          // Handle error
        }
      );
    }
  });
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

  
  
  onEdit(productId: string, updatedProduct: any) {
    this.productservice.updateProduct(productId, updatedProduct).subscribe(
      updatedProduct => {
        console.log('Product updated:', updatedProduct);
        // Handle success and update UI if needed
      },
      error => {
        console.error('Error updating product:', error);
        // Handle error and update UI if needed
      }
    );
  }
  
  

  onDelete(product: any) {
    console.log('onDelete method called with product:', product);

    const dialog = document.createElement('dialog');
  
    dialog.innerHTML = `
      <style>
        .dialog-container {
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
          padding: 20px;
          max-width: 400px;
          margin: 0 auto;
        }
  
        .form-group button {
          margin-right: 8px;
        }
        .btn-dark {
          background-color: rgb(0, 0, 0);
          color: #fff;
          border: none;
          padding:auto;
        }
        .btn-dark:hover {
          background-color: rgb(0, 0, 0);
          color: #fff;
          cursor: pointer;
          transition: 0.5s all ease;
        }
        .btn-secondary {
          background-color: #6c757d;
          color: #fff;
          border: none;
          padding:auto;
        }
        .btn-secondary:hover {
          background-color: #666666;
          color: #fff;
          border: none;
        }
      </style>
      <form class="form-group">
      <div class="dialog-container">
        <h3>Confirmation de suppression</h3>
        <p>Êtes-vous sûr de vouloir supprimer ce produit ?</p>
        <br>
        <button type="button" class="btn btn-dark" id="confirmButton">Confirmer</button>
        <button type="button" class="btn btn-secondary" id="cancelButton">Annuler</button>
      </div>
    </form>
    `;
  
    const confirmButton = dialog.querySelector('#confirmButton')!;
    confirmButton.addEventListener('click', () => {
      dialog.close();
      if (product._id) {
        this.productservice.supprimerProduct(product._id).subscribe(
          () => {
            this.getproducts();
            this.deletedd = true;
            setTimeout(() => {
              this.deletedd = false;
            }, 1700);
          },
          (error) => {
            console.error('Error deleting product:', error);
            // Handle the error here (e.g., show an error message)
          }
        );
      }
      
    });
  
    const cancelButton = dialog.querySelector('#cancelButton')!;
    cancelButton.addEventListener('click', () => {
      dialog.close();
    });
  
    document.body.appendChild(dialog);
    dialog.showModal();
  }


}
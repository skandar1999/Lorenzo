import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EditProductDialogComponentComponent } from '../edit-product-dialog-component/edit-product-dialog-component.component';
import { ProductsService } from 'src/services/products.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { SupprimeProductDialogComponentComponent } from '../supprime-product-dialog-component/supprime-product-dialog-component.component';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  
  allproducts: any[] = [];
  product: any[] = [];
  deletedd: boolean = false;
  updatedProductData: any = {};
  bsModalRef: any;
  productCount!: number;
  countReservation!: number;
  countUsers!: number;
  countMessages !: number;

  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  data:any;
  constructor(
    private productservice: ProductsService,
    private router: Router,
    private modalService: BsModalService,
    public authService: AuthService,
    public userService:UserService,
  ) { }
  

  ngOnInit(): void {
    this.getproducts(); 
    this.productservice.getCountOfProducts().subscribe((data: any) => {
      this.productCount = data.totalCount;
    });

    this.productservice.getCountOfReservations().subscribe((data: any) => {
      this.countReservation = data.Count;
    });
    
    this.userService.getCountOfUsers().subscribe((data: any) => {
      this.countUsers = data.Count;
    });

    this.userService.getCountOfMessages().subscribe((data: any) => {
      this.countMessages = data.Count;
    });

    
  }

  onLogout() {
    this.authService.logout();
  }
  
    openEditDialog(product: any): void {
      console.log('Opening dialog with product:', product);
      this.bsModalRef = this.modalService.show(EditProductDialogComponentComponent, {
        initialState: {
          productData: { ...product } 
        },
        class: 'modal-dialog-centered'
      });
  
    this.bsModalRef.content?.dialogClosed.subscribe((updatedProduct: any) => {
      console.log('Dialog closed with updated product:', updatedProduct);
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
      this.productservice.supprimerProduct(product._id).subscribe(
        response => {
            setTimeout(() => {
            window.location.reload();
          }, 1500);
         
        },
        error => {
        }
      );
    }
  });
}
  
  


  getproducts() {
    this.productservice.getProducts().subscribe(
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
  
  
}


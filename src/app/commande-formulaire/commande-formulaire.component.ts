import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CartService } from 'src/services/cart.service';
import { ProductsService } from 'src/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commande-formulaire',
  templateUrl: './commande-formulaire.component.html',
})
export class CommandeFormulaireComponent {
  cartItems: any[] = [];
  userData: any = {
    name: '',
    userLastName: '',
    UserTelephone: '',
    UserRegion: '',
  };

  successMessage: string = '';


  constructor(public bsModalRef: BsModalRef , private cartService: CartService ,
    private productService : ProductsService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
  }

  submitForm() {
  }

  sendReservationData(): void {
    const requestData = {
      productIds: this.cartItems.map((item) => item._id), 
      userData: this.userData,
    };
  
    this.productService.reserveProducts(requestData).subscribe(
      (response) => {
        console.log('Reservation successful', response);
        this.successMessage = 'We have received your order!'; // Set the success message
  
        // Show a SweetAlert success message
        Swal.fire({
          icon: 'success',
          title: 'Reservation Successful',
          text: 'Your order has been placed successfully!',
        });
      },
      (error) => {
        console.error('Error reserving products', error);
  
        // Show a SweetAlert error message
        Swal.fire({
          icon: 'error',
          title: 'Reservation Failed',
          text: 'Something went wrong while placing your order. Please try again.',
        });
      }
    );
  }
  

  
}

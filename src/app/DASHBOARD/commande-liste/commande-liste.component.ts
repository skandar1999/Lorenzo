import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { ProductsService } from 'src/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commande-liste',
  templateUrl: './commande-liste.component.html',
  styleUrls: ['./commande-liste.component.css']
})
export class CommandeListeComponent implements OnInit {
  commandes: any[] = [];
  groupedCommandes: any[] = [];
  loadingProducts: boolean = false;

  constructor(
    public authService: AuthService,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getCommandeList();
  }

  getCommandeList() {
    this.productService.getCommandeList().subscribe(
      (commandes: any[]) => {
        console.log(commandes);
        this.commandes = commandes;
        this.attachProductNames(() => {
          this.groupedCommandes = this.groupByUser(this.commandes); // Group after attaching product names
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  attachProductNames(callback?: () => void) {
    this.loadingProducts = true;
    const requests = this.commandes.map((commande) =>
      this.productService.getProductById(commande.productId).toPromise()
    );

    Promise.all(requests)
      .then((results) => {
        results.forEach((product: any, index) => {
          this.commandes[index].productName = product.name; // Add product name to each commande
        });
        this.loadingProducts = false;
        if (callback) callback(); // Trigger callback after processing
      })
      .catch((error) => {
        console.error('Error fetching product names:', error);
        this.loadingProducts = false;
      });
  }

  groupByUser(commandes: any[]) {
    const grouped = commandes.reduce((acc, curr) => {
      const key = `${curr.userName} ${curr.userLastName}`;
      if (!acc[key]) {
        acc[key] = {
          userName: curr.userName,
          userLastName: curr.userLastName,
          userRegion: curr.UserRegion, // Fix here: Use the correct field
          reservations: []
        };
      }
      acc[key].reservations.push(curr);
      return acc;
    }, {});
  
    return Object.values(grouped);
  }
  

  showSuccessAlert(title: string, message: string): void {
    Swal.fire(title, message, 'success');
  }

  showErrorAlert(title: string, message: string): void {
    Swal.fire(title, message, 'error');
  }

  confirmCommande(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to confirm this reservation?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirm it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.confirmCommande(id).subscribe({
          next: () => {
            this.showSuccessAlert('Confirmed!', 'The reservation has been confirmed.');
            this.getCommandeList();
          },
          error: () => {
            this.showErrorAlert('Error!', 'An error occurred while confirming the reservation.');
          }
        });
      }
    });
  }

  completedCommande(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to complete this reservation?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, complete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.completedCommande(id).subscribe({
          next: () => {
            this.showSuccessAlert('Completed!', 'The reservation has been completed.');
            this.getCommandeList();
          },
          error: () => {
            this.showErrorAlert('Error!', 'An error occurred while completing the reservation.');
          }
        });
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }
  updateDisponibleStatus(reservationId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to mark this product as disponible?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, update',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Updating...',
          text: 'Please wait while we update the product status.',
          allowOutsideClick: false,
          didOpen: () => Swal.showLoading()
        });
  
        this.productService.updateDisponibleStatus(reservationId).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Updated Successfully',
              text: 'The product status has been updated!'
            });
  
            this.getCommandeList(); // Refresh the reservation list
          },
          error: (error) => {
            console.error('Error updating disponible status:', error);
  
            Swal.fire({
              icon: 'error',
              title: 'Update Failed',
              text: 'Could not update the product status. Please try again.'
            });
          }
        });
      }
    });
  }
  
  
}

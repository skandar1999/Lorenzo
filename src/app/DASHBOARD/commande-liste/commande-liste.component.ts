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

  constructor(  public authService: AuthService,
    private productservice: ProductsService,

  ) { }

  ngOnInit(): void {
    this.getCommandeList(); 

  }
  onLogout() {
    this.authService.logout();
  }


  getCommandeList() {
    this.productservice.getCommandeList().subscribe(
      (commandes: any[]) => {
        console.log(commandes);
        this.commandes = commandes; 
      },
      error => {
        console.error(error);
      }
    );
  }

  confirmCommande(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to confirm this reservation?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirm it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productservice.confirmCommande(id).subscribe({
          next: (updatedCommande) => {
            Swal.fire(
              'Confirmed!',
              'The reservation has been confirmed.',
              'success'
            );
  
            // Update the UI with the confirmed commande
            const index = this.commandes.findIndex(c => c._id === id);
            if (index !== -1) {
              this.commandes[index] = updatedCommande;
            }
          },
          error: (err) => {
            console.error('Error confirming commande:', err);
            Swal.fire(
              'Error!',
              'An error occurred while confirming the reservation.',
              'error'
            );
          }
        });
      }
    });
  }



  
  completedCommande(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to complet this reservation?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, confirm it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productservice.completedCommande(id).subscribe({
          next: (updatedCommande) => {
            Swal.fire(
              'Confirmed!',
              'The reservation has been confirmed.',
              'success'
            );
  
            // Update the UI with the confirmed commande
            const index = this.commandes.findIndex(c => c._id === id);
            if (index !== -1) {
              this.commandes[index] = updatedCommande;
            }
          },
          error: (err) => {
            console.error('Error confirming commande:', err);
            Swal.fire(
              'Error!',
              'An error occurred while confirming the reservation.',
              'error'
            );
          }
        });
      }
    });
  }


}

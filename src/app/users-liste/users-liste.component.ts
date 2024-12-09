import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-liste',
  templateUrl: './users-liste.component.html',
  styleUrls: ['./users-liste.component.css']
})
export class UsersListeComponent implements OnInit {
  users: any[] = [];

  constructor(
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.fetchUsers(); 
  }



  fetchUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response; 
        console.log('users fetched successfully:', this.users);
      },
      error: (error) => {
        console.error('Error fetching messages:', error);
      }
    });
  }



  

  updateRoleUser(id: string): void {
    // Confirm before updating
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update the Role User?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, mark as seen',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Show loading spinner
        Swal.fire({
          title: 'Updating...',
          text: 'Please wait while we update the role status.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
  
        // Perform the update
        this.userService.updateRoleUser(id).subscribe({
          next: (updatedRole) => {
            // Update the local list
            const index = this.users.findIndex((msg) => msg.id === updatedRole.id);
            if (index !== -1) {
              this.users[index].seem = updatedRole.role;
            }
  
            // Show success notification
            Swal.fire({
              icon: 'success',
              title: 'user Updated',
              text: 'user Role status has benn succesfully updated!',
            });
              this.fetchUsers();
          },
          error: (error) => {
            console.error('Error updating message status:', error);
  
            // Show error notification
            Swal.fire({
              icon: 'error',
              title: 'Update Failed',
              text: 'Could not update message status. Please try again.',
            });
          },
        });
      }
    });
  }
  


}

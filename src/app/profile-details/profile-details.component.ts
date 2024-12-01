import { Component, OnInit } from '@angular/core';

import jwt_decode from 'jwt-decode';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../footer/models/user';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css'],
})
export class ProfileDetailsComponent implements OnInit {
  loggedInUserId!: string; // Add this property to hold the user ID

  name!: string ;
  lastname!: string; 
  phone!: string ;

  users!: User[];
  user: any; // Use your User type

  hidePassword: boolean = true;

  password!: string;
  PasswordActuelle!: string;

  token!: any;
  updateSuccess: boolean = false;
  confirmPassword!: string;

  not: boolean = false;
  errorMessage!: string;
  passwordMatch!: boolean;
  passwordFieldsModified = false;
  hidePassword1: boolean = true;
  hidePassword2: boolean = true;
  hidePassword3: boolean = true;
  errorMessagepw: boolean = false; // Set this based on the error response from the API
  NewPassword: string = '';

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private route: ActivatedRoute,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
  this.route.params.subscribe((params) => {
    const token = params['token'];
    const decodedToken: any = this.jwtHelper.decodeToken(token);

    if (decodedToken) {
      this.user = decodedToken; // Assign decoded data to the user object
      console.log('JWT Token:', token);
    }

  });
}




  onLogout() {
    this.authService.logout();
  }

  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  getUserImageUrl(): string {
    // Assuming you have a user object with an 'image' property
    return `http://localhost:3000/uploads/${this.user.image}`;
  }

 updateUserData() {
  const newUser = {
    NewName: this.name,
    NewLastName: this.lastname,
    NewPhone: this.phone,
  };

  this.userService.updateUserData(this.user.id, newUser).subscribe(
    (updatedUserData) => {
      // Display success SweetAlert
      Swal.fire({
        icon: 'success',
        title: 'User Updated',
        text: 'User data has been successfully updated!',
        confirmButtonText: 'OK',
        timer: 3000,
      });
      console.log('Updated User Data:', updatedUserData);
    },
    (error) => {
      // Display error SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'An error occurred while updating user data.',
        confirmButtonText: 'Try Again',
      });
      console.error('Error updating user data', error);
    }
  );
}


  
  updatePasswordFields() {
    this.passwordFieldsModified = true;
  }
  togglePassword1() {
    this.hidePassword1 = !this.hidePassword1;
  }

  // Toggle password visibility for New Password
  togglePassword2() {
    this.hidePassword2 = !this.hidePassword2;
  }

  // Toggle password visibility for Confirm Password
  togglePassword3() {
    this.hidePassword3 = !this.hidePassword3;
  }
  

  updatePassword(): void {
    // Validate if the new password and confirm password match
    if (this.NewPassword !== this.confirmPassword) {
      this.errorMessagepw = true;
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'The new password and confirm password do not match!',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    if (!this.PasswordActuelle) {
      this.errorMessagepw = true;
      Swal.fire({
        icon: 'error',
        title: 'Current Password Required',
        text: 'Please enter your current password.',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    const payload = {
      currentPassword: this.PasswordActuelle,
      newPassword: this.NewPassword
    };
    
    this.userService.updatePassword(this.user.id, payload).subscribe({
      next: (response) => {
        console.log('Password updated successfully:', response);
        Swal.fire({
          icon: 'success',
          title: 'Password Updated',
          text: 'Your password has been successfully updated!',
          confirmButtonText: 'OK',
          timer: 3000,
        });
      },
      error: (error) => {
        console.error('Error updating password:', error);
        this.errorMessagepw = true;
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: error.error || 'There was an error while updating your password.',
          confirmButtonText: 'Try Again',
        });
      }
    });
  
  
  
}
}
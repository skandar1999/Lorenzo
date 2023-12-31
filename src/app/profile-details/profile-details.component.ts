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
  errorMessagepw!: string;

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
      console.log('User data:', this.user); // Display user data in the console
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
    
    this.userService.updateUserData(this.user.id , newUser).subscribe(
      (updatedUserData) => {
        // Handle success (e.g., display a success message)
        console.log('Updated User Data:', updatedUserData);
      },
      (error) => {
        // Handle error (e.g., display an error message)
        console.error('Error updating user data', error);
      }
    );
    }
  
    
  
  
  updatePasswordFields() {
    this.passwordFieldsModified = true;
  }

  public hidePassword1 = true;
  public hidePassword2 = true;
  public hidePassword3 = true;

  public togglePassword1(): void {
    this.hidePassword1 = !this.hidePassword1;
  }

  public togglePassword2(): void {
    this.hidePassword2 = !this.hidePassword2;
  }

  public togglePassword3(): void {
    this.hidePassword3 = !this.hidePassword3;
  }
}
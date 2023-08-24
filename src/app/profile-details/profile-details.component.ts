import { Component, OnInit } from '@angular/core';

import jwt_decode from 'jwt-decode';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../footer/models/user';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css'],
})
export class ProfileDetailsComponent implements OnInit {

  users!: User[];
  user: any; // Use your User type
  hidePassword: boolean = true;

  password!:string;
  PasswordActuelle!:string;

 
  token!:any;
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
    this.route.params.subscribe(params => {
      const token = params['token'];
      this.user = this.jwtHelper.decodeToken(token);
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
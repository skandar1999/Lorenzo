import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service'; 
import { User } from '../footer/models/user'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  newUser: User = new User();

  errorMessage: string = '';
  successMessage: string = '';


  constructor(private userService: UserService , private router: Router) { }

  ngOnInit(): void {}

  registerUser() {
    this.userService.registerUser(this.newUser).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        this.successMessage = 'User registered successfully'; // Set the success message
  
        setTimeout(() => {
          this.successMessage = ''; 
        }, 3000); 
      },
      (error) => {
        console.error('Error during registration:', error);
        if (error instanceof Error && error.message.includes('Email already exists')) {
          this.errorMessage = 'Email already exists'; 

          setTimeout(() => {
            this.errorMessage = ''; 
          }, 3000);
        } else {
          
        }
      }
    );
  }
  
  
  
  
}
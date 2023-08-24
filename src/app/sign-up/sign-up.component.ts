import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service'; // Update path
import { User } from '../footer/models/user'; // Update path
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  newUser: User = new User();

  errorMessage: string = ''; // Add this property
  successMessage: string = '';


  constructor(private userService: UserService , private router: Router) { }

  ngOnInit(): void {}

  registerUser() {
    this.userService.registerUser(this.newUser).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        this.successMessage = 'User registered successfully'; // Set the success message
  
        setTimeout(() => {
          this.successMessage = ''; // Clear the success message after a delay
        }, 3000); // Delay in milliseconds (e.g., 2000 ms = 2 seconds)
      },
      (error) => {
        console.error('Error during registration:', error);
        if (error instanceof Error && error.message.includes('Email already exists')) {
          this.errorMessage = 'Email already exists'; // Set the error message

          setTimeout(() => {
            this.errorMessage = ''; // Clear the success message after a delay
          }, 3000); // Delay in milliseconds (e.g., 2000 ms = 2 seconds)
        } else {
          // Handle other errors
        }
      }
    );
  }
  
  
  
  
}
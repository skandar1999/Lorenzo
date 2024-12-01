import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { User } from '../footer/models/user';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: User = new User(); 
  hidePassword: boolean = true;
  vide: boolean = false;

  err: boolean = false;


  constructor(private authService: AuthService,
            private router: Router ,
            private jwtHelper: JwtHelperService
    ) { }

  ngOnInit(): void {
  }

  onLoggedin(): void {
    if (!this.user.email || !this.user.password) {
      this.vide = true;
      setTimeout(() => {
        this.vide = false;
      }, 3000);
      return;
    }
  
    this.authService.login(this.user)
  .subscribe(
    (data) => {
      // Handle successful login
      console.log('Login successful:', data);
      this.authService.saveToken(data.token); // Use the correct property name "token"
      
      const decodedToken = this.jwtHelper.decodeToken(data.token);
      console.log('Received token:', decodedToken);

      this.router.navigate(['/profile']).then(() => {
        // Refresh the page after navigating to profile
        window.location.reload();
      });
    },
    error => {
      this.err = true;
      setTimeout(() => {
        this.err = false;
      }, 3000);
    }
  );
  }
  
  


  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }
  
}

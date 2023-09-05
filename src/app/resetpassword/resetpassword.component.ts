import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  email!: string;
  vide: boolean = false;
  users: any;
  successMessage!: string;
  errorMessage!:string;
  resetSuccessful!: boolean;
  notSuccessful!: boolean;
  constructor(private userService: UserService , private router: Router) { }

  ngOnInit(): void {
  }

  
  onSubmit() {
    if (!this.email ) {
      this.vide = true;
      setTimeout(() => {
        this.vide = false;
      }, 3000);
      return;
    }
    this.userService.PasswordReset(this.email)
      .subscribe(users => {
        this.users = users;
        console.log('Password reset successful!');
        this.successMessage = 'New password sent to your email address.';
        this.resetSuccessful = true;
        // navigate to login page after 3 seconds
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 3000);
      }, error => {
        if (error.status === 404) {
          this.notSuccessful = true;
          this.errorMessage = 'Email address does not exist.';
          setTimeout(() => {
            this.notSuccessful = false;
            this.errorMessage = '';
          }, 3000); // hide error message after 3 seconds
        }
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/services/auth.service';
import { UserService } from 'src/services/user.service';
import { User } from '../footer/models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  users!: User[];
  user: any; // Use your User type
  

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private route: ActivatedRoute,
    private jwtHelper: JwtHelperService,
    private http: HttpClient,
    private router: Router


  ) {}  
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const token = params['token'];
      this.user = this.jwtHelper.decodeToken(token);

    });
    
  } 

  reload() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate([currentUrl]));
  }


  

  getUserImageUrl(): string {
    // Assuming you have a user object with an 'image' property
    return `http://localhost:3000/uploads/${this.user.image}`;
  }


  checkTokenExpiration(): void {
    if (this.authService.isloggedIn && this.authService.isTokenExpired()) {
      this.authService.logout();
    }

}

}

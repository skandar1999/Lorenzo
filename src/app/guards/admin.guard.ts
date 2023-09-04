import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  jwtHelper: any;

  user: any; 
  constructor(private authService: AuthService, private router: Router,
    private route: ActivatedRoute,
    ) {}

    canActivate(): boolean {
      const token = this.authService.getToken(); // Replace with your method to retrieve the token
  
      if (token) {
        // Call AuthService's decodeToken method to decode the token
        const decodedToken: any = this.authService.decodeToken(token);
  
        if (decodedToken && decodedToken.role === 'admin') {
          return true; // User has the 'admin' role, allow access to the dashboard
        }
      }
  
      // If token is missing, invalid, or the user doesn't have 'admin' role, redirect to forbidden page
      this.router.navigate(['app-forbidden']);
      return false;
    }
  
 

  
  
}

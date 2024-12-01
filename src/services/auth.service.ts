import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/footer/models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginURL = 'http://127.0.0.1:3000/user/login';
  private tokenKey = 'jwt';  // Use a constant for token storage key
  public isloggedIn: Boolean = false;
  private token!: string;
  public email!: string;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  ngOnInit() {
    // Attach event listener to update token if changed in localStorage
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage && event.key === this.tokenKey) {
        console.log('Token changed in storage', event.newValue);  // Log new value
        this.loadToken();
      }
    });
    this.loadToken(); // Load the token on initialization
  }

  // Save token to localStorage and update internal state
  saveToken(jwt: string) {
    console.log('Saving token to localStorage:', jwt); // Log token saving
    localStorage.setItem(this.tokenKey, jwt); // Save token to localStorage
    this.token = jwt;
    this.isloggedIn = true;
    this.decodeJWT();
  }

  // Decode the JWT and extract the user email
  decodeJWT(): void {
    if (this.token) {
      const decodedToken = this.jwtHelper.decodeToken(this.token);
      this.email = decodedToken.sub;
    }
  }

  // Load token from localStorage
  loadToken() {
    const storedToken = localStorage.getItem(this.tokenKey);
    console.log('Loading token from localStorage:', storedToken);  // Log token loading
    if (storedToken) {
      this.token = storedToken;
      this.isloggedIn = true;
      this.decodeJWT();
    } else {
      this.isloggedIn = false;
      console.log('No token found in localStorage');  // Log if no token is found
    }
  }

  // Check if the token has expired
  isTokenExpired(): Boolean {
    return this.jwtHelper.isTokenExpired(this.token);
  }

  // Get the current token
  getToken(): string {
    return this.token;
  }

  // Handle login process and save token
  login(user: User) {
    return this.http.post<any>(this.loginURL, user).pipe(
      tap((response) => {
        if (response.jwt) {
          this.saveToken(response.jwt);  // Save the new token after login
        } else {
          console.error('JWT not received in login response');  // Log if no JWT is received
        }
      })
    );
  }

  // Decode the token to get its contents
  decodeToken(token: string): any {
    try {
      return this.jwtHelper.decodeToken(token);
    } catch (error) {
      // Handle token decoding errors
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Fetch user details by their email (or other identifiers)
  getUserDetailsByEmail(id: string): Observable<any> {
    const url = `http://127.0.0.1:3000/user/userdetails/${id}`;
    return this.http.get<any>(url);
  }

  // Logout process
  logout() {
    this.token = ''; // Clear token
    this.isloggedIn = false;
    localStorage.removeItem(this.tokenKey); // Remove token from storage
    this.router.navigate(['/login']); // Redirect to login page
  }

  // Check if user is logged in
  isUser(): Boolean {
    return this.isloggedIn;
  }
}

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
  email!: string;
  public loggedUser!: string;
  users!: User[];
  private loggedInUserId: string | undefined;

  token!: string;
  public isloggedIn: Boolean = false;

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private helper: JwtHelperService,
    private router: Router
  ) {}

  ngOnInit() {
    // Attach the event listener to 'storage' in ngOnInit
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage && event.key === 'jwt') {
        this.loadToken();
      }
    });
  }

  saveToken(jwt: string) {
    localStorage.setItem('jwt', jwt); // Save token to localStorage
    this.token = jwt;
    this.isloggedIn = true;
  }

  

  decodeJWT(): void {
    if (this.token == undefined) return;
    const decodedToken = this.helper.decodeToken(this.token);
    this.email = decodedToken.sub;
  }

  loadToken() {
    this.token = localStorage.getItem('jwt')!;
    if (this.token) {
      this.isloggedIn = true;
      this.decodeJWT();
      this.email = localStorage.getItem('email')!; // Change 'username' to 'email'
    } else {
      this.isloggedIn = false;
    }
  }

  isTokenExpired(): Boolean {
    return this.helper.isTokenExpired(this.token);
  }

  getToken(): string {
    return this.token;
  }

  login(user: User) {
    return this.http.post<any>(this.loginURL, user).pipe(
      tap((response) => {
        this.saveToken(response.jwt);
      })
    );
  }

  decodeToken(token: string) {
    const decodedToken = this.jwtHelper.decodeToken(token);
    console.log('Decoded Token:', decodedToken);
  }

  getUserDetailsByEmail(id: string): Observable<any> {
    const url = `http://127.0.0.1:3000/user/userdetails/${id}`;
    return this.http.get<any>(url);
  }

  logout() {
    this.loggedUser = undefined!;
    this.token = undefined!;
    this.isloggedIn = false;
    window.localStorage.removeItem('jwt');
    window.localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }


  
}

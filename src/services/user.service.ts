import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { User } from 'src/app/footer/models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiURL = 'http://127.0.0.1:3000/user/register';
  private baseUrl = 'http://127.0.0.1:3000/user';

  constructor(private http: HttpClient) {}

  registerUser(user: User): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<any>(this.apiURL, user, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          throw new Error('Email already exists');
        }
        throw error;
      })
    );
  }

  getUserDetailsByEmail(email: string): Observable<User> {
    const url = `${this.baseUrl}/userdetailsemail/${email}`;
    return this.http.get<User>(url);
  }

  PasswordReset(email: string): Observable<any> {
    const url = `${this.baseUrl}/reset-password`;
    const data = { email };
    return this.http.post(url, data);
  }





  updateUserData(userId: string, newUser: any): Observable<any> {
    const url = `${this.baseUrl}/updateuserdata/${userId}`;
        return this.http.put(url, newUser);
  }
  
  
}

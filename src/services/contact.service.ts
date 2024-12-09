import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/footer/models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private baseUrl = 'http://127.0.0.1:3000/contact'; 

  constructor(private http: HttpClient) {}

  sendMessage(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.baseUrl}/sendMessage`, contact);
  }

  getAllMessages(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.baseUrl}/getAllMessages`);
  }

  updateSeemStatus(id: string): Observable<Contact> {
    return this.http.put<Contact>(`${this.baseUrl}/seemMessage/${id}`, {});
  }

  deleteMessage(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteMessage/${id}`);
  }
}

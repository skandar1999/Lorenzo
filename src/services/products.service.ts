import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Product } from 'src/app/footer/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'http://127.0.0.1:3000/product'; 
  private baseResevationUrl = 'http://127.0.0.1:3000/reservation';  

  constructor(private http: HttpClient) {}


  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getallproduct`);
  }

  getProductsNoPromo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getallproductnopromo`);
  }


  getProductsWithPromo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getallproductwithpromo`);
  }


  getPOLO(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getpoloproducts`);
  }

  getCHEMISE(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getchemiseproducts`);
  }

  getTSHIRT(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-shirt-products`);
  }

  getProductById(productId: string): Observable<any> {
    const url = `${this.baseUrl}/getProductById/${productId}`; 
    return this.http.get(url);
  }


  addProduct(productData: FormData) {
    const url = `${this.baseUrl}/addproduct`;
    return this.http.post(url, productData);
  }



  supprimerProduct(id: number): Observable<any> {
    const url = `${this.baseUrl}/deleteProduct/${id}`;
    return this.http.delete<any>(url);
  }
  



  updateProduct(productId: string, updatedProduct: any): Observable<any> {
    const url = `${this.baseUrl}/updateproduct/${productId}`;
    return this.http.put(url, updatedProduct);
  }
  
 

  getCountOfProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/countProducts`);
  }
  
  getCountOfReservations(): Observable<any> {
    return this.http.get(`${this.baseResevationUrl}/countReservation`);
  }


  
  reserveProducts(requestData: any): Observable<any> {
    const url = `${this.baseResevationUrl}/reserveproducts`;
    return this.http.post(url, requestData);
  }


  getCommandeList(): Observable<any> {
    return this.http.get<any>(`${this.baseResevationUrl}/allCommande`);
  }
  
  confirmCommande(id: string): Observable<any> {
    return this.http.put(`${this.baseResevationUrl}/confirmCommande/${id}`, {});
  }

  completedCommande(id: string): Observable<any> {
    return this.http.put(`${this.baseResevationUrl}/completeCommande/${id}`, {});
  }


  
  updateDisponibleStatus(productId: string): Observable<any> {
    const url = `http://127.0.0.1:3000/product/UpdateDisponibleProduct/${productId}`;
    return this.http.put(url, {}); // Pass any required payload
  }
  
  
}

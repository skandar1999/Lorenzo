import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Product } from 'src/app/footer/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'http://127.0.0.1:3000/product'; // Change this to your backend URL

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
    const url = `${this.baseUrl}/getProductById/${productId}`; // Adjust the endpoint URL
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
  
}

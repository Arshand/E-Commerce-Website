import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5000/api/products';
  private socket;

  constructor(private http: HttpClient) {
    this.socket = io('http://localhost:5000');
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getProduct(productId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${productId}`);
  }

  getProductAddedListener(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('productAdded', (product: any) => {
        observer.next(product);
      });
    });
  }
}

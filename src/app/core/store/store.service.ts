import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../store/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StoreService {

  constructor(private http: HttpClient) { }

  getProductListing(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`${environment.API_URL}/store/products`);
  }

  getProduct(index: number): Observable<Product> {
    return this.http.get<Product>(`${environment.API_URL}/store/products/` + index);
  }

  addToCart(productId: number, size: string, quantity: number) {
    const request = {productId: productId, size: size, quantity: quantity};

    return this.http.put(`${environment.API_URL}/store/cart`, request);

  }
}

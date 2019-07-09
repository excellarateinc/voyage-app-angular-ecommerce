import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { AddToCart } from './addToCart.model';

@Injectable()
export class StoreService {

  constructor(private http: HttpClient) { }

  getProductListing(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`${environment.API_URL}/store/products`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.API_URL}/store/products/` + id);
  }

  addToCart(addToCart: AddToCart) {
    const request = {productId: addToCart.productId, size: addToCart.size, quantity: addToCart.quantity};

    return this.http.put(`${environment.API_URL}/store/cart`, request);

  }
}

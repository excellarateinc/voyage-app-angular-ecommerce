import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { AddToCart } from './addToCart.model';
import { Cart } from '../cart/cart.model';
import { Checkout } from '../checkout/checkout.model';

@Injectable()
export class StoreService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`${environment.API_URL}/store/products`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.API_URL}/store/products/${id}`);
  }

  addToCart(addToCart: AddToCart) {
    return this.http.put(`${environment.API_URL}/store/cart`, addToCart);
  }

  fetchCart() {
    return this.http.get<Cart>(`${environment.API_URL}/store/cart`);
  }

  getLastCompletedCart() {
    return this.http.get<Cart>(`${environment.API_URL}/store/cart/last-completed`);
  }

  removeFromCart(id: number) {
    return this.http.delete(`${environment.API_URL}/store/cart/` + id);
  }

  checkout(checkout: Checkout): Observable<void> {
    return this.http.post<void>(`${environment.API_URL}/store/checkout`, checkout);
  }
}

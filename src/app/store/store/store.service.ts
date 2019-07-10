import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';
import { AddToCart } from './addToCart.model';
import { Cart } from '../cart/cart.model';

@Injectable()
export class StoreService {

  private cartLength = new BehaviorSubject<number>(0);
  cartLength$ = this.cartLength.asObservable();

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

  fetchCart() {
		return this.http.get<Cart>(`${environment.API_URL}/store/cart`);
  }

  removeFromCart(id: number) {
    return this.http.delete(`${environment.API_URL}/store/cart/` + id);
  }

  emitCartLength(cartLength: number): void {
    this.cartLength.next(this.cartLength.value + cartLength);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Product } from './product.model';

@Injectable()
export class ProductService {

  private products: Product[] = [
    new Product(0,
      'Lighthouse Hoodie',
      'https://cdni.llbean.net/is/image/wim/504211_464_41?hei=200&amp;wid=174',
      59.99,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      ['S', 'M', 'L', 'XL']
    ),
    new Product(1,
      'Lighthouse Coffee Mug',
      'https://cdnimg.webstaurantstore.com/images/products/large/32515/1018923.jpg',
      19.99,
      'Super sweet mug to hold your coffee.',
      []
    ),
  ];

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.products.slice();
  }

  getProduct(index: number) {
    return this.products[index];
  }

  addToCart(productId: number, size: string, quantity: number) {
    const request = {productId: productId, size: size, quantity: quantity};

    return this.http.put(`${environment.API_URL}/store/cart`, request);

  }
}

import { Component, OnInit } from '@angular/core';
import { StoreService } from 'app/store/store/store.service';
import { CartProduct } from 'app/store/cart/cart-product.model';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {

  cart: CartProduct[];
  cartLength = 0;

	constructor(private storeService: StoreService) { }

	ngOnInit() {
    this.storeService.cartLength$
      .subscribe(size => this.cartLength = size);

		this.storeService.fetchCart().subscribe(responseData => {

      this.cart = responseData.products;
      this.storeService.emitCartLength(-responseData.products.length);
      this.storeService.emitCartLength(responseData.products.length);
    });


	}
}

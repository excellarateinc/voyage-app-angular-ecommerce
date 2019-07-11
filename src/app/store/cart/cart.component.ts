import { Component, OnInit } from '@angular/core';
import { CartProduct } from './cart-product.model';
import { StoreService } from '../store/store.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

	subtotal: number = 0;
  cartProducts: CartProduct[];
  currentCartSize: number;

	constructor(private storeService: StoreService) { }

	ngOnInit() {
		this.storeService.fetchCart().subscribe(responseData => {
      this.cartProducts = responseData.products;
      this.subtotal = responseData.totalCost;
      this.currentCartSize = responseData.products.length
		});
	}

	onRemove(index: number) {
    console.log('Removing cart item...');
    this.subtotal = this.subtotal - this.cartProducts[index].price;
    this.currentCartSize = this.currentCartSize - this.cartProducts[index].quantity
    this.storeService.removeFromCart(this.cartProducts[index].cartProductId).subscribe();
		this.cartProducts.splice(index, 1);
    this.cartProducts = this.cartProducts.slice();

    this.storeService.emitCartLength(this.currentCartSize);
	}

	onCheckout() {
		console.log('Shopping cart checking out...');
	}

}

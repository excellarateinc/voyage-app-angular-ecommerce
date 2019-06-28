import { Component, OnInit } from '@angular/core';
import { CartProduct } from './cart-product.model';
import { ProductService } from '../product/product.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

	subtotal = 12345.99;
	cartProducts: CartProduct[];

	constructor(private productService: ProductService) { }

	ngOnInit() {
		this.productService.fetchCart().subscribe(responseData => {
			this.cartProducts = responseData.products;
		});
	}

	onRemove(index: number) {
		console.log('Removing cart item...');
		this.cartProducts.splice(index, 1);
		this.cartProducts = this.cartProducts.slice();
	}

	onCheckout() {
		console.log('Shopping cart checking out...');
	}

}

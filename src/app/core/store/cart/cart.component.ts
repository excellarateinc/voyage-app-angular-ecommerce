import { Component, OnInit } from '@angular/core';
import { CartProduct } from './cart-product.model';
import { ProductService } from '../product/product.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

	subtotal = 12345.99
	cartProducts: CartProduct[] = [

		new CartProduct(1, 1, 'Fables', 'description',
			'https://upload.wikimedia.org/wikipedia/en/d/dc/R.E.M._-_Fables_of_the_Reconstruction.jpg',
			5.99, null, 1
		),

		new CartProduct(2, 2, 'Pageant', 'description',
			'https://upload.wikimedia.org/wikipedia/en/e/ed/R.E.M._-_Lifes_Rich_Pageant.jpg',
			4.99, null, 1
		),

		new CartProduct(3, 3, 'Document', 'description',
			'https://upload.wikimedia.org/wikipedia/en/6/6f/R.E.M._-_Document.jpg',
			3.99, null, 1
		),

		new CartProduct(4, 4, 'Green', 'description',
			'https://upload.wikimedia.org/wikipedia/en/7/73/R.E.M._-_Green.jpg',
			2.99, null, 1
		),

		new CartProduct(5, 5, 'Time', 'description',
			'https://upload.wikimedia.org/wikipedia/en/9/9b/R.E.M._-_Out_of_Time.jpg',
			1.99, null, 1
		),

	]

	constructor(private productService: ProductService) { }

	ngOnInit() {
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

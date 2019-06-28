import { Component, OnInit } from '@angular/core';
import { CartItem } from './cart-item.model';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

	subtotal = 12345.99
	cartItems: CartItem[] = [

		new CartItem(
			'Fables',
			5.99,
			'https://upload.wikimedia.org/wikipedia/en/d/dc/R.E.M._-_Fables_of_the_Reconstruction.jpg',
			1
		),

		new CartItem(
			'Pageant',
			4.99,
			'https://upload.wikimedia.org/wikipedia/en/e/ed/R.E.M._-_Lifes_Rich_Pageant.jpg',
			1
		),

		new CartItem(
			'Document',
			3.99,
			'https://upload.wikimedia.org/wikipedia/en/6/6f/R.E.M._-_Document.jpg',
			1
		),

		new CartItem(
			'Green',
			2.99,
			'https://upload.wikimedia.org/wikipedia/en/7/73/R.E.M._-_Green.jpg',
			1
		),

		new CartItem(
			'Time',
			1.99,
			'https://upload.wikimedia.org/wikipedia/en/9/9b/R.E.M._-_Out_of_Time.jpg',
			1
		),

	]

	constructor() { }

	ngOnInit() {
	}
}

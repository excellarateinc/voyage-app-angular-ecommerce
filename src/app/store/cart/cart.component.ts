import { Component, OnInit } from '@angular/core';
import { CartProduct } from './cart-product.model';
import { StoreService } from '../store/store.service';
import { BroadcastService } from 'app/core/broadcast.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  subtotal = 0;
  cartProducts: CartProduct[] = [];

  constructor(private storeService: StoreService, private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.storeService.fetchCart().subscribe(response => {
      this.cartProducts = response ? response.products : [];
      this.subtotal = response ? response.totalCost : 0;
    });
  }

  removeItem(index: number) {
    const product = this.cartProducts[index];
    this.storeService.removeFromCart(product.cartProductId).subscribe(updatedCart => {
      this.cartProducts = updatedCart.products;
      this.subtotal = updatedCart.totalCost;
      this.broadcastService.emitGetCart();
    });
  }
}

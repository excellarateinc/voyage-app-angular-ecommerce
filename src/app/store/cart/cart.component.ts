import { Component, OnInit } from '@angular/core';
import { BroadcastService } from 'app/core/broadcast.service';
import { CartProduct } from 'app/shared/models/cart-product.model';
import { StoreService } from 'app/shared/services/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  subtotal = 0;
  cartProducts: CartProduct[] = [];

  constructor(
    private storeService: StoreService,
    private broadcastService: BroadcastService) { }

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

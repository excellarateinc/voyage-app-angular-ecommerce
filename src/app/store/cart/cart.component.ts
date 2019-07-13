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
  currentCartSize: number;

  constructor(private storeService: StoreService, private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.storeService.fetchCart().subscribe(response => {
      this.cartProducts = response ? response.products : [];
      this.subtotal = response ? response.totalCost : 0;
      this.currentCartSize = this.cartProducts.length;
    });
  }

  onRemove(index: number) {
    this.subtotal = this.subtotal - this.cartProducts[index].price;
    this.currentCartSize = this.currentCartSize - this.cartProducts[index].quantity;
    this.storeService.removeFromCart(this.cartProducts[index].cartProductId).subscribe();
    this.cartProducts.splice(index, 1);
    this.cartProducts = this.cartProducts.slice();
    this.broadcastService.emitCartUpdated(this.currentCartSize);
  }
}

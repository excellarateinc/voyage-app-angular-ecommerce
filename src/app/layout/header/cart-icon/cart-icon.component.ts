import { Component, OnInit } from '@angular/core';
import { StoreService } from 'app/store/store/store.service';
import { CartProduct } from 'app/store/cart/cart-product.model';
import { BroadcastService } from 'app/core/broadcast.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {
  cart: CartProduct[];
  cartLength = 0;

  constructor(private storeService: StoreService, private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.broadcastService.cartUpdated$
      .subscribe(cartLength => this.cartLength = cartLength);

    this.storeService.fetchCart().subscribe(result => {
      this.cart = result.products;
    });
  }
}

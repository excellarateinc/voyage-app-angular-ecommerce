import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store/store.service';
import { Cart } from '../cart/cart.model';

@Component({
  selector: 'app-checkout-confirmation',
  templateUrl: './checkout-confirmation.component.html',
  styleUrls: ['./checkout-confirmation.component.scss']
})
export class CheckoutConfirmationComponent implements OnInit {
  cart: Cart;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.getLastCompletedCart()
      .subscribe(result => this.cart = result);
  }

}

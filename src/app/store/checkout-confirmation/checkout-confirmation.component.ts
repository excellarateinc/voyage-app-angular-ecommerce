import { Component, OnInit } from '@angular/core';
import { Cart } from 'app/shared/models/cart.model';
import { StoreService } from 'app/shared/services/store.service';

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

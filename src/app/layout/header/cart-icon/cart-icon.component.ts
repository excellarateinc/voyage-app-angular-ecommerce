import { Component, OnInit } from '@angular/core';
import { StoreService } from 'app/store/store/store.service';
import { BroadcastService } from 'app/core/broadcast.service';

@Component({
  selector: 'app-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss']
})
export class CartIconComponent implements OnInit {
  cartLength = 0;

  constructor(private storeService: StoreService, private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.getCart();
    this.broadcastService.getCart$.subscribe(() => {
      this.getCart();
    });
  }

  private getCart(): void {
    this.storeService.fetchCart().subscribe(result => {
      this.cartLength = result ? result.products.length : 0;
    });
  }
}

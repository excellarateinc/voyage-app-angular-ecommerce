import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../store/product.model';
import { StoreService } from '../store/store.service';
import { AddToCart } from '../store/addToCart.model';
import { NotificationService } from 'app/shared/services/notification.service';
import { BroadcastService } from 'app/core/broadcast.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  quantity = 1;
  selectedSize = null;
  loading = false;
  submitted = false;

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private broadcastService: BroadcastService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.storeService.getProduct(id)
        .subscribe(result => this.product = result);
    });
  }

  setSize(size: string): void {
    this.selectedSize = size;
  }

  addToCart(): void {
    this.submitted = true;
    if ((this.product.sizes && this.product.sizes.length && !this.selectedSize) || !this.quantity) {
      return;
    }
    this.loading = true;
    const model: AddToCart = {
      productId: this.product.productId,
      size: this.selectedSize,
      quantity: this.quantity
    };
    this.storeService.addToCart(model)
      .subscribe(() => {
        this.broadcastService.emitGetCart();
        this.router.navigate(['/store']);
        this.notificationService.showSuccessMessage('Successfully added to cart');
        this.loading = false;
        this.submitted = false;
      }, errors => {
        this.notificationService.showErrorMessage(errors.error.errorDescription);
        this.loading = false;
        this.submitted = false;
      });
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationService } from 'app/shared/services/notification.service';
import { BroadcastService } from 'app/core/broadcast.service';
import { MobileService } from 'app/core/mobile.service';
import { Subscription } from 'rxjs';
import { Product } from 'app/shared/models/product.model';
import { StoreService } from 'app/shared/services/store.service';
import { AddToCart } from 'app/shared/models/addToCart.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product;
  quantity = 1;
  selectedSize = null;
  loading = false;
  submitted = false;
  mobile = false;
  private watcher: Subscription;

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private broadcastService: BroadcastService,
    private mobileService: MobileService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.storeService.getProduct(id)
        .subscribe(result => this.product = result);
    });

    this.mobile = this.mobileService.isMobile();
    this.watcher = this.mobileService.mobileChanged$
      .subscribe(isMobile => this.mobile = isMobile);
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
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
        this.router.navigate(['/store/cart']);
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

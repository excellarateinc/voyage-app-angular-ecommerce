import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../store/product.model';
import { StoreService } from '../store/store.service';
import { AddToCart } from '../store/addToCart.model';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  shoppingForm: FormGroup;
  loading = false;
  currentCartSize: number = 0;

  constructor(
    private storeService: StoreService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.initializeForm();
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.storeService.getProduct(id)
        .subscribe(result => {
          this.product = result;
          if (this.product.sizes && this.product.sizes.length > 0) {
            this.shoppingForm.get('size').setValidators(Validators.required);
          } else {
            this.shoppingForm.get('size').clearValidators();
            this.shoppingForm.get('size').updateValueAndValidity();
          }
        });
    });
  }

  private initializeForm(): void {
    this.shoppingForm = this.formBuilder.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
      size: [null],
    });
  }

  addToCart(): void {
    if (this.shoppingForm.invalid) {
      return;
    }
    this.loading = true;
    const model = this.shoppingForm.value as AddToCart;
    model.productId = this.product.productId;
    this.storeService.addToCart(model)
      .subscribe(result => {
        this.router.navigate(['/store']);
        this.notificationService.showSuccessMessage('Successfully added to cart');
        this.loading = false;
      }, errors => {
        this.notificationService.showErrorMessage(errors.error.errorDescription);
        this.loading = false;
      });

    this.storeService.emitCartLength(this.currentCartSize);
  }
}

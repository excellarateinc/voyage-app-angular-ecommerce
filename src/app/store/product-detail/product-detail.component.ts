import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Product } from '../../core/store/product.model';
import { StoreService } from '../../core/store/store.service';
import { AddToCart } from 'app/core/store/addToCart.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  shoppingForm: FormGroup;
  errors: any[] = [];
  loading = false;

  constructor(
    private storeService: StoreService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.initializeForm();
    this.route.data
      .subscribe(
        (data) => {
          this.errors = [];
          if (data.resolvedData.hasOwnProperty("productId")) {
            this.product = data.resolvedData;
            this.shoppingForm.get('productId').setValue(this.product.productId);
            if (this.product.sizes && this.product.sizes.length > 0) {
              this.shoppingForm.get('size').setValidators(Validators.required);
            } else {
              this.shoppingForm.get('size').clearValidators();
              this.shoppingForm.get('size').updateValueAndValidity();
            }
          } else {
            this.product = null;
            this.errors = data.resolvedData.error;
          }
        }
      );
  }

  private initializeForm(): void {
    this.shoppingForm = this.formBuilder.group({
      productId: [''],
      quantity: ['1', [Validators.required, Validators.min(1)]],
      size: [''],
    });
  }

  addToCart(): void {
    this.errors = [];
    if (this.shoppingForm.invalid) {
      this.errors.push({ errorDescription: 'Invalid data entered' });
      return;
    }
    this.loading = true;
    const quantity = this.shoppingForm.value.quantity as number;

    this.storeService.addToCart(this.shoppingForm.value as AddToCart)
      .subscribe(result => {
        this.router.navigate(['/store']);
        this.snackBar.open(quantity + (quantity > 1 ? ' items' : ' item') + ' added to cart', null, { duration: 5000 });
        this.loading = false;
      }, errors => {
        this.errors = errors.error;
        this.loading = false;
      });
  }
}

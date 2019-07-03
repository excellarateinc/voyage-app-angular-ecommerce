import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Product } from '../../core/store/product.model';
import { StoreService } from '../../core/store/store.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product();
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
    this.storeService.getProduct(this.route.snapshot.params['id']).subscribe(result => {
      this.product = result;
      if (this.product.sizes && this.product.sizes.length === 0) {
        this.shoppingForm.get('size').clearValidators();
        this.shoppingForm.get('size').updateValueAndValidity();
      } else {
        this.shoppingForm.get('size').setValidators(Validators.required);
      }
    })

    this.route.params
      .subscribe(
        (params: Params) => {
          this.storeService.getProduct(params['id']).subscribe(result => {
            this.product = result;
            if (this.product.sizes && this.product.sizes.length === 0) {
              this.shoppingForm.get('size').clearValidators();
              this.shoppingForm.get('size').updateValueAndValidity();
            } else {
              this.shoppingForm.get('size').setValidators(Validators.required);
            }
          })
        }
      )
  }

  private initializeForm(): void {
    this.shoppingForm = this.formBuilder.group({
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
    const size = this.shoppingForm.value.size;

    this.storeService.addToCart(this.product.productId, size, quantity)
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

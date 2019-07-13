import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Checkout } from './checkout.model';
import { StoreService } from '../store/store.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
    this.initializeForm();
  }

  checkout(): void {
    if (this.checkoutForm.invalid) {
      return;
    }

    const model = this.checkoutForm.value as Checkout;
    this.storeService.checkout(model).subscribe(result => {
      this.router.navigate(['/store/checkout/confirmation']);
    }, error => {
      this.notificationService.showErrorMessage(error.error[0].errorDescription);
    });

  }

  private initializeForm(): void {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      company: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }
}

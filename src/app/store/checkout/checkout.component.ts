import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { BroadcastService } from 'app/core/broadcast.service';
import { User } from 'app/core/user/user.model';
import { StoreService } from 'app/shared/services/store.service';
import { Checkout } from 'app/shared/models/checkout.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  balance = 0;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService,
    private notificationService: NotificationService,
    private userService: UserService,
    private broadcastService: BroadcastService,
    private router: Router) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.initializeForm(user);
    });
    this.broadcastService.balanceUpdated$
      .subscribe(balance => this.balance = balance);
  }

  checkout(): void {
    if (this.checkoutForm.invalid) {
      return;
    }

    this.loading = true;
    const model = this.checkoutForm.value as Checkout;
    this.storeService.checkout(model).subscribe(result => {
      this.broadcastService.emitGetCart();
      this.broadcastService.emitGetBalance();
      this.router.navigate(['/store/checkout/confirmation']);
      this.loading = false;
    }, error => {
      this.notificationService.showErrorMessage(error.error[0].errorDescription);
      this.loading = false;
    });

  }

  private initializeForm(user: User): void {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [user.email, Validators.required],
      company: [user.company, Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required]
    });

    if (user.firstName && user.lastName) {
      this.checkoutForm.get('name').setValue(`${user.firstName} ${user.lastName}`);
      this.checkoutForm.updateValueAndValidity();
    }
  }
}

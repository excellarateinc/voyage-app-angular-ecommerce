import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Checkout } from './checkout.model';
import { StoreService } from '../store/store.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { BroadcastService } from 'app/core/broadcast.service';
import { User } from 'app/core/user/user.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  balance = 0;

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

    const model = this.checkoutForm.value as Checkout;
    this.storeService.checkout(model).subscribe(result => {
      this.router.navigate(['/store/checkout/confirmation']);
    }, error => {
      this.notificationService.showErrorMessage(error.error[0].errorDescription);
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
  }
}

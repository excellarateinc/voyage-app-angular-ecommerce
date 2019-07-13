import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Checkout } from './checkout.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  checkout(): void {
    if (this.checkoutForm.invalid) {
      return;
    }

    const model = this.checkoutForm.value as Checkout;
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

    // this.profileForm.get('newPassword').valueChanges.subscribe(value => {
    //   if (value) {
    //     this.profileForm.get('currentPassword').setValidators([Validators.required]);
    //     this.profileForm.get('confirmNewPassword').setValidators([ConfirmPasswordValidator.MatchPassword]);
    //     this.profileForm.get('currentPassword').updateValueAndValidity();
    //     this.profileForm.get('confirmNewPassword').updateValueAndValidity();
    //   } else {
    //     this.profileForm.get('currentPassword').clearValidators();
    //     this.profileForm.get('confirmNewPassword').clearValidators();
    //     this.profileForm.get('currentPassword').updateValueAndValidity();
    //     this.profileForm.get('confirmNewPassword').updateValueAndValidity();
    //   }
    // });
  }
}

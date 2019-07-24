import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';
import { ConfirmPasswordValidator } from 'app/shared/validators/confirm-password.validator';
import { ForgotPassword } from './forgot-password.model';
import { ForgotPasswordStep } from './forgot-password-step.enum';
import { Router } from '@angular/router';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  model: ForgotPassword = { forgotPasswordStep: ForgotPasswordStep.VerifyUser };
  codeSent = false;
  errorMessages: any[];
  forgotPasswordStep = ForgotPasswordStep;

  constructor(
    private formBuilder: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
    this.initializeForm();
  }

  async sendCode() {
    if (this.form.get('username').invalid) {
      this.form.get('username').markAsTouched();
      return;
    }
    try {
      this.model.username = this.form.get('username').value;
      this.model = await this.forgotPasswordService.sendVerificationCode(this.model);
      this.errorMessages = null;
    } catch (error) {
      this.errorMessages = error.error;
    }
  }

  async verifyCode() {
    if (this.form.get('code').invalid) {
      this.form.get('code').markAsTouched();
      return;
    }
    this.model.verificationCode = this.form.get('code').value;
    try {
      this.model = await this.forgotPasswordService.verifyCode(this.model);
      this.errorMessages = null;
    } catch (error) {
      this.errorMessages = [{ errorDescription: 'Code verification failed' }];
    }
  }

  async changePassword() {
    if (this.form.get('newPassword').invalid || this.form.get('confirmNewPassword').invalid) {
      this.form.get('newPassword').markAsTouched();
      this.form.get('confirmNewPassword').markAsTouched();
      return;
    }
    this.model.newPassword = this.form.get('newPassword').value;
    this.model.confirmNewPassword = this.form.get('confirmNewPassword').value;
    try {
      await this.forgotPasswordService.changePassword(this.model);
      this.notificationService.showSuccessMessage('Password changed successfully');
      this.router.navigate(['/authentication/login']);
    } catch (error) {
      this.errorMessages = error.error;
    }
  }

  private initializeForm(): void {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      code: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmNewPassword: [null, ConfirmPasswordValidator.MatchPassword]
    });
  }
}

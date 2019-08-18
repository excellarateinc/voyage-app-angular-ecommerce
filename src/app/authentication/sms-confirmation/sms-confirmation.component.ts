import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MobileService } from '../../core/mobile.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-sms-confirmation',
  templateUrl: './sms-confirmation.component.html',
  styleUrls: ['./sms-confirmation.component.scss']
})
export class SmsConfirmationComponent implements OnInit, OnDestroy {
  codeForm: FormGroup;
  isMobile = false;
  working = false;
  private watcher: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    @Inject('Window') private window: any,
    private mobileService: MobileService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.isMobile = this.mobileService.isMobile();
    this.watcher = this.mobileService.mobileChanged$.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

  submitCode(): void {
    if (this.codeForm.invalid) {
      return;
    }
    this.working = true;
    const code = this.codeForm.value.code;
    this.window.location.href = `${environment.SERVER_URL}/Authentication/LoginLink?token=${code}&isMobile=false`;
  }

  private initializeForm(): void {
    this.codeForm = this.formBuilder.group({
      code: ['', Validators.required]
    });
  }
}

import { Component, OnInit, OnDestroy, Inject, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MobileService } from '../../core/mobile.service';
import { environment } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-sms-confirmation',
  templateUrl: './sms-confirmation.component.html',
  styleUrls: ['./sms-confirmation.component.scss']
})
export class SmsConfirmationComponent implements OnInit, AfterViewInit, OnDestroy {
  codeForm: FormGroup;
  loginFailed = false;
  isMobile = false;
  working = false;
  private watcher: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    @Inject('Window') private window: any,
    private mobileService: MobileService,
    private notificationService: NotificationService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();
    this.isMobile = this.mobileService.isMobile();
    this.watcher = this.mobileService.mobileChanged$.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
  }

  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
          const error = params['error'];
          setTimeout(() => {
            if (error === 'linkInvalid') {
              this.notificationService.showErrorMessage('The code was invalid.');
            } else if (error === 'linkUsed') {
              this.notificationService.showErrorMessage('The code was already in use');
            }
          });
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
    this.window.location.href = `${environment.SERVER_URL}/Authentication/LoginLink?token=${code}`;
  }

  private initializeForm(): void {
    this.codeForm = this.formBuilder.group({
      code: ['', Validators.required]
    });
  }
}

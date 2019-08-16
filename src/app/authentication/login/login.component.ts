import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from './login.service';
import { MobileService } from '../../core/mobile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginFailed = false;
  isMobile = false;
  working = false;
  private watcher: Subscription;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private mobileService: MobileService,
    private router: Router) { }

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

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.working = true;
    const phone = this.loginForm.value.phone;
    this.loginService.sendLoginLink(phone, this.isMobile)
      .subscribe(result => {
        this.router.navigate(['authentication/sms-confirmation']);
        this.working = false;
      }, error => {
        this.working = false;
        this.loginFailed = true;
      });
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      phone: ['', Validators.required]
    });
  }
}

import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from './login.service';
import { Login } from './login.model';
import { MobileService } from '../../core/mobile.service';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

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
  private redirectUrl: string;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    @Inject('Window') private window: any,
    private mobileService: MobileService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeForm();
    this.isMobile = this.mobileService.isMobile();
    this.watcher = this.mobileService.mobileChanged$.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
    this.route.queryParams
      .subscribe(params => this.redirectUrl = params['redirectUrl'] || '');
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
        // if (this.redirectUrl) {
        //   this.router.navigate([this.redirectUrl]);
        //   return;
        // }
        // this.router.navigate(['store']);
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

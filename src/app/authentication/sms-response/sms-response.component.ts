import { Component, OnInit, OnDestroy, Inject, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MobileService } from '../../core/mobile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-sms-response',
  templateUrl: './sms-response.component.html',
  styleUrls: ['./sms-response.component.scss']
})
export class SmsResponseComponent implements OnInit, AfterViewInit, OnDestroy {
  codeForm: FormGroup;
  isMobile = false;
  working = false;
  error: string;
  private watcher: Subscription;
  private phone: string;

  constructor(
    private mobileService: MobileService,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.isMobile = this.mobileService.isMobile();
    this.watcher = this.mobileService.mobileChanged$.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
  }

  ngAfterViewInit() {
    this.route.queryParams
      .subscribe(params => {
        setTimeout(() => {
          this.error = params['error'];
          this.phone = params['phone'];
        });
      });
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

  requestNewCode(): void {
    if (!this.phone) {
      return;
    }
    this.loginService.sendLoginLink(this.phone, this.isMobile)
      .subscribe(() => {
        this.router.navigate(['authentication/sms-confirmation']);
      });
  }
}

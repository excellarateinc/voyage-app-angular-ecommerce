import { Component, OnInit, OnDestroy, Inject, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MobileService } from '../../core/mobile.service';
import { environment } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-linked-in-sync',
  templateUrl: './linked-in-sync.component.html',
  styleUrls: ['./linked-in-sync.component.scss']
})
export class LinkedInSyncComponent implements OnInit, OnDestroy {
  codeForm: FormGroup;
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
    this.isMobile = this.mobileService.isMobile();
    this.watcher = this.mobileService.mobileChanged$.subscribe((isMobile: boolean) => {
      this.isMobile = isMobile;
    });
  }

  ngOnDestroy(): void {
    this.watcher.unsubscribe();
  }

  syncWithLinkedIn(): void {
    this.window.location.href = `${environment.SERVER_URL}/Authentication/LinkedIn`;
  }
}

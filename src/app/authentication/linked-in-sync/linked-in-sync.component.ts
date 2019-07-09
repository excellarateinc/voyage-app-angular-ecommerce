import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MobileService } from '../../core/mobile.service';
import { environment } from 'environments/environment';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-linked-in-sync',
  templateUrl: './linked-in-sync.component.html',
  styleUrls: ['./linked-in-sync.component.scss']
})
export class LinkedInSyncComponent implements OnInit, OnDestroy {
  isMobile = false;
  working = false;
  private watcher: Subscription;

  constructor(
    @Inject('Window') private window: any,
    private mobileService: MobileService,
    private authenticationService: AuthenticationService) { }

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
    const token = this.authenticationService.getToken();
    this.window.location.href = `${environment.SERVER_URL}/Authentication/LinkedIn?access_token=${token}`;
  }
}

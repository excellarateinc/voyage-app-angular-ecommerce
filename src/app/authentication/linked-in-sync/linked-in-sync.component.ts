import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-linked-in-sync',
  templateUrl: './linked-in-sync.component.html',
  styleUrls: ['./linked-in-sync.component.scss']
})
export class LinkedInSyncComponent implements OnInit {
  isMobile = false;
  working = false;

  constructor(
    @Inject('Window') private window: any,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void { }

  syncWithLinkedIn(): void {
    this.working = true;
    const token = this.authenticationService.getToken();
    this.window.location.href = `${environment.SERVER_URL}/Authentication/LinkedIn?access_token=${token}`;
  }
}

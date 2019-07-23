import { Component, OnInit, Inject } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthenticationService } from '../authentication.service';
import { UserService } from 'app/core/user/user.service';
import { Router } from '@angular/router';

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
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.userService.emitUserVerificationRequired(true);
    });
  }

  syncWithLinkedIn(): void {
    this.working = true;
    const token = this.authenticationService.getToken();
    this.window.location.href = `${environment.SERVER_URL}/Authentication/LinkedIn?access_token=${token}`;
  }

  dismiss(): void {
    this.router.navigate(['/store']);
    this.userService.emitUserVerificationRequired(false);
  }
}

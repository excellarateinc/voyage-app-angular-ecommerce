import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InviteService } from './invite.service';
import { MobileService } from '../../core/mobile.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit, OnDestroy {
  inviteForm: FormGroup;
  failureMessage: string = null;
  isMobile = false;
  loading = false;
  private watcher: Subscription;

  constructor(
    private inviteService: InviteService,
    private formBuilder: FormBuilder,
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

  invite(): void {
    if (this.inviteForm.invalid) {
      return;
    }
    this.loading = true;
    const mobileNumber = this.inviteForm.value.mobileNumber;
    this.inviteService.invite(mobileNumber)
      .subscribe(result => {
        this.failureMessage = null;
        this.loading = false;
      }, error => {
        this.failureMessage = error.error[0].errorDescription;
        this.loading = false;
      });
  }

  private initializeForm(): void {
    this.inviteForm = this.formBuilder.group({
      mobileNumber: ['', Validators.required],
    });
  }
}

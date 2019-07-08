import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
// import { InviteService } from './invite.service';
import { MobileService } from '../../core/mobile.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {
  inviteForm: FormGroup;
  inviteFailed = false;
  isMobile = false;
  loading = false;
  private watcher: Subscription;

  constructor(
    // private inviteService: InviteService,
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

  invite(): void {
    if (this.inviteForm.invalid) {
      return;
    }
    this.loading = true;
    const mobileNumber = this.inviteForm.value as string;
    // this.inviteService.invite(mobileNumber)
    //   .subscribe(result => {
    //     this.window.location.reload();
    //     this.loading = false;
    //   }, error => { 
    //     this.inviteFailed = true;
    //     this.loading = false;
    //   });
  }

  private initializeForm(): void {
    this.inviteForm = this.formBuilder.group({
      mobileNumber: ['', Validators.required],
    });
  }
}

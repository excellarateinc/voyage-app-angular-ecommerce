import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileImageDirective } from './profile-image.directive';
import { FileDownloadService } from './services/file-download.service';
import { NotificationService } from './services/notification.service';
import { AccountService } from './accounts/account.service';
import { StoreService } from 'app/store/store/store.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProfileImageDirective
  ],
  providers: [
    FileDownloadService,
    NotificationService,
    NotificationService,
    AccountService,
    StoreService
  ],
  exports: [ProfileImageDirective]
})
export class SharedModule { }

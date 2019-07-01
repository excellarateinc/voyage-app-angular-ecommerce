import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileImageDirective } from './profile-image.directive';
import { FileDownloadService } from './services/file-download.service';
import { NotificationService } from './services/notification.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProfileImageDirective],
  providers: [
    FileDownloadService,
    NotificationService,
  ],
  exports: [ProfileImageDirective]
})
export class SharedModule { }

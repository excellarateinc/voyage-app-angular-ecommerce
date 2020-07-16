import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileImageDirective } from './profile-image.directive';
import { FileDownloadService } from './services/file-download.service';
import { NotificationService } from './services/notification.service';
import { AccountService } from './accounts/account.service';
import { StoreService } from './services/store.service';
import { ConfirmCancelOrderComponent } from './confirm-cancel-order/confirm-cancel-order.component';
import { AngularMaterialModule } from 'app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    ProfileImageDirective,
    ConfirmCancelOrderComponent
  ],
  providers: [
    FileDownloadService,
    NotificationService,
    NotificationService,
    AccountService,
    StoreService
  ],
  exports: [
    ProfileImageDirective,
    ConfirmCancelOrderComponent
  ]

})
export class SharedModule { }

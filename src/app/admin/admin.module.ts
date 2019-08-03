import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminRoutingModule } from './admin-routing.module';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { InviteComponent } from './invite/invite.component';
import { InviteService } from './invite/invite.service';
import { AdminComponent } from './admin.component';
import { AdminService } from './admin.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  declarations: [
    UserAdminComponent,
    InviteComponent,
    AdminComponent
  ],
  providers: [
    InviteService,
    AdminService
  ]
})
export class AdminModule { }

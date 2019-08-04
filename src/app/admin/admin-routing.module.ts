import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { InviteComponent } from './invite/invite.component';
import { AdminComponent } from './admin.component';
import { UserDetailsComponent } from './user-admin/user-details/user-details.component';

const adminRoutes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'users', component: UserAdminComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'invite', component: InviteComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

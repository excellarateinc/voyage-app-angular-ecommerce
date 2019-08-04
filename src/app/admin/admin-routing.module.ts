import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { InviteComponent } from './invite/invite.component';
import { AdminComponent } from './admin.component';
import { UserDetailsComponent } from './user-admin/user-details/user-details.component';
import { OrderAdminComponent } from './order-admin/order-admin.component';
import { OrderDetailsComponent } from './order-admin/order-details/order-details.component';

const adminRoutes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'invite', component: InviteComponent },
  { path: 'users', component: UserAdminComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'orders', component: OrderAdminComponent },
  { path: 'orders/:id', component: OrderDetailsComponent }
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

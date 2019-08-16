import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './authentication/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/store', pathMatch: 'full' },
  { path: 'store', loadChildren: () => import('app/store/store.module').then(m => m.StoreModule), canActivate: [AuthGuardService] },
  { path: 'admin', loadChildren: () => import('app/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuardService] },
  { path: 'profile', loadChildren: () => import('app/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuardService] },
  { path: 'about-us', loadChildren: () => import('app/about-us/about-us.module').then(m => m.AboutUsModule) },
  { path: 'orders', loadChildren: () => import('app/orders/orders.module').then(m => m.OrdersModule), canActivate: [AuthGuardService]  },
  {
    path: 'contact-us',
    loadChildren: () => import('app/contact-us/contact-us.module').then(m => m.ContactUsModule), canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }

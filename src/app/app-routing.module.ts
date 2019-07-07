import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './authentication/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/store', pathMatch: 'full' },
  { path: 'store', loadChildren: 'app/store/store.module#StoreModule', canActivate: [AuthGuardService] },
  { path: 'examples', loadChildren: 'app/examples/examples.module#ExamplesModule', canActivate: [AuthGuardService] },
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canActivate: [AuthGuardService] },
  { path: 'profile', loadChildren: 'app/profile/profile.module#ProfileModule', canActivate: [AuthGuardService] },
  { path: 'about-us', loadChildren: 'app/about-us/about-us.module#AboutUsModule' },
  { path: 'orders', loadChildren: 'app/orders/orders.module#OrdersModule' }
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

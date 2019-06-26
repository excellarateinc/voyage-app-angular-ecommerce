import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './authentication/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'store', loadChildren: 'app/dashboard/dashboard.module#DashboardModule', canLoad: [AuthGuardService] },
  { path: 'examples', loadChildren: 'app/examples/examples.module#ExamplesModule', canLoad: [AuthGuardService] },
  { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule', canLoad: [AuthGuardService] },
  { path: 'profile', loadChildren: 'app/profile/profile.module#ProfileModule', canLoad: [AuthGuardService] }
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store.component';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AuthGuardService } from '../authentication/auth-guard.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const storeRoutes: Routes = [
  { path: '', component: StoreComponent, canActivate: [AuthGuardService] },
  { path: 'products/:id', component: ProductDetailComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [
    CommonModule,
    AuthenticationModule,
    RouterModule.forChild(storeRoutes)
  ],
  declarations: []
})
export class StoreRoutingModule { }

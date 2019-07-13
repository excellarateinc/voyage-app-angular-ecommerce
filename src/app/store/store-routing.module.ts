import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store.component';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AuthGuardService } from '../authentication/auth-guard.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

const storeRoutes: Routes = [
  { path: '', component: StoreComponent, canActivate: [AuthGuardService] },
  { path: 'products/:id', component: ProductDetailComponent, canActivate: [AuthGuardService] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService] },
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

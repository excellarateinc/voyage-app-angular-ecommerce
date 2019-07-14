import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { StoreComponent } from './store.component';
import { ExamplesModule } from '../examples/examples.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { StoreService } from './store/store.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';
import { CheckoutConfirmationComponent } from './checkout-confirmation/checkout-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    StoreRoutingModule,
    ExamplesModule,
    FlexLayoutModule,
    SharedModule
  ],
  declarations: [
    StoreComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    CheckoutConfirmationComponent
  ],
  providers: [
    StoreService,
  ],
  exports: [
    ProductDetailComponent
  ]
})
export class StoreModule { }

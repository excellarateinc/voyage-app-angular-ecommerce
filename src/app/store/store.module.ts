import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { StoreComponent } from './store.component';
import { ExamplesModule } from '../examples/examples.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { StoreService } from 'app/core/store/store.service';
import { StoreResolverService } from 'app/core/store/store-resolver.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    StoreRoutingModule,
    ExamplesModule,
    FlexLayoutModule,
    SharedModule
  ],
  declarations: [StoreComponent, ProductDetailComponent],
  providers: [
    StoreService,
    StoreResolverService,
  ],
  exports: [
    ProductDetailComponent
  ]
})
export class StoreModule { }

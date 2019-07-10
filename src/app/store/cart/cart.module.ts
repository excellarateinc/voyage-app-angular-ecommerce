import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { FlexLayoutModule } from '../../../../node_modules/@angular/flex-layout';
import { StoreService } from '../store/store.service';


@NgModule({
	imports: [
		CommonModule,
		AngularMaterialModule,
		CartRoutingModule,
		FlexLayoutModule
	],
  declarations: [CartComponent],
  providers: [
    StoreService,
  ],

})
export class CartModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart-routing.module';
import { ExamplesModule } from '../../../examples/examples.module';
import { AngularMaterialModule } from '../../../angular-material/angular-material.module';
import { FlexLayoutModule } from '../../../../../node_modules/@angular/flex-layout';


@NgModule({
	imports: [
		CommonModule,
		AngularMaterialModule,
		CartRoutingModule,
		ExamplesModule,
		FlexLayoutModule
	],
	declarations: [CartComponent]
})
export class CartModule { }

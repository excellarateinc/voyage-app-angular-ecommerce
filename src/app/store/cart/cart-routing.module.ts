import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart.component';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { AuthGuardService } from '../../authentication/auth-guard.service';

const cartRoutes: Routes = [
	{ path: '', component: CartComponent, canActivate: [AuthGuardService] }
];

@NgModule({
	imports: [
		CommonModule,
		AuthenticationModule,
		RouterModule.forChild(cartRoutes)
	],
	declarations: []
})
export class CartRoutingModule { }

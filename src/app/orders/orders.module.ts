import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  declarations: [OrdersComponent]
})
export class OrdersModule { }

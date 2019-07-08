import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrdersService } from './orders.service';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  imports: [
    CommonModule,
    OrdersRoutingModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  declarations: [
    OrdersComponent,
    OrderDetailComponent
  ],
  providers: [
    OrdersService
  ]
})
export class OrdersModule { }

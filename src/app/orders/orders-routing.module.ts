import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const ordersRoutes: Routes = [
  { path: '', component: OrdersComponent },
  { path: ':id', component: OrderDetailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ordersRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }

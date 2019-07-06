import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './orders.component';

const ordersRoutes: Routes = [
  { path: '', component: OrdersComponent }
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

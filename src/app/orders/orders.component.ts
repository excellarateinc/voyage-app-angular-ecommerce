import { Component, OnInit } from '@angular/core';
import { OrdersService } from './orders.service';
import { Order } from './order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[];

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.ordersService.getOrders()
      .subscribe(result => this.orders = result);
  }

}

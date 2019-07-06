import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Order } from '../order.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: Order;

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    // this.ordersService.getOrder()
    //   .subscribe(result => this.order = result);
  }

}

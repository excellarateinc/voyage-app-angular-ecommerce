import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Order } from '../order.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: Order;

  constructor(private route: ActivatedRoute, private ordersService: OrdersService) { }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      const orderId = Number(params['id']);
      this.ordersService.getOrder(orderId)
        .subscribe(result => this.order = result);
    });

  }

}

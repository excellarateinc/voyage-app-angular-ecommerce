import { Component, OnInit } from '@angular/core';
import { Order } from 'app/orders/order.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.scss']
})
export class OrderAdminComponent implements OnInit {
  orders: Order[];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getOrders()
      .subscribe(result => this.orders = result);
  }
}

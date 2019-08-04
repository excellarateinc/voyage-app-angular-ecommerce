import { Component, OnInit } from '@angular/core';
import { Order } from 'app/orders/order.model';
import { AdminService } from 'app/admin/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: Order;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.adminService.getOrder(id)
        .subscribe(result => this.order = result);
    });
  }

  setOrderToShipped(): void {
    this.adminService.setOrderToShipped(this.order.orderId, this.order.trackingLink)
      .subscribe(result => {
        this.notificationService.showSuccessMessage('Order set to shipped successfully');
        this.order = result;
      });
  }

  removeItem(index: number) {
    const product = this.order.cartProducts[index];
    this.adminService.removeItemFromOrder(this.order.orderId, product.cartProductId).subscribe(result => {
      this.notificationService.showSuccessMessage('Item removed successfully');
      this.order = result;
    });
  }

  cancelOrder(): void {
    this.adminService.cancelOrder(this.order.orderId)
      .subscribe(() => {
        this.notificationService.showSuccessMessage('Order cancelled successfully');
        this.router.navigate(['/admin/orders']);
      });
  }
}

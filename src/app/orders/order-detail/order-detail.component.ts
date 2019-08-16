import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../orders.service';
import { Order } from '../order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmCancelOrderComponent } from '../../shared/confirm-cancel-order/confirm-cancel-order.component';
import { BroadcastService } from 'app/core/broadcast.service';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order: Order;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private router: Router,
    private matDialog: MatDialog,
    private broadcastService: BroadcastService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      const orderId = Number(params['id']);
      this.ordersService.getOrder(orderId)
        .subscribe(result => this.order = result);
    });
  }

  cancelOrder(): void {
    const dialogRef = this.matDialog.open(ConfirmCancelOrderComponent, { });
    dialogRef.afterClosed().subscribe(confirmed => {
      if (!confirmed) {
        return;
      }
      this.ordersService.cancelOrder(this.order.orderId)
        .subscribe(() => {
          this.notificationService.showSuccessMessage('Order cancelled successfully');
          this.broadcastService.emitGetBalance();
          this.router.navigate(['/orders']);
        });
    });
  }
}

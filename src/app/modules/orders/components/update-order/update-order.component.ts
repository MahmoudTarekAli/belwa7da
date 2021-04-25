import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OrdersService } from '../../service/orders.service';
import { NotificationService } from '../../../../shared/services/notifications/notification.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.scss'],
})
export class UpdateOrderComponent implements OnInit {
  loading = false;
  isFixed = false;
  status = '';
  selectedStatus: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public order: any,
    private httpOrdersService: OrdersService,
    private dialogRef: MatDialog,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}
  updateOrder() {
    const data = {
      text: this.selectedStatus,
    };
    this.httpOrdersService.updateOrder(data, this.order._id).subscribe(
      (data) => {
        if (data.status === 200) {
          this.notificationService.successNotification(`Order status updated`);
          this.dialogRef.closeAll();
        }
      },
      (err) => {
        this.notificationService.errorNotification(err.error.message);
      }
    );
  }
}

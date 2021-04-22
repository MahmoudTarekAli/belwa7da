import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatPaginator } from '@angular/material';
import { fromEvent, Subject } from 'rxjs';
import { NotificationService } from '../../shared/services/notifications/notification.service';
import { OrdersDataSource } from './classes/orders.data.source';
import { OrdersService } from './service/orders.service';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { UpdateOrderComponent } from './components/update-order/update-order.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss', '../tabel.scss'],
})
export class OrdersComponent implements OnInit, AfterViewInit {
  dataSource = new OrdersDataSource(this.ordersService);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  $destroy = new Subject<any>();
  public loadingTemplate: TemplateRef<any>;
  // @ts-ignore
  @ViewChild('customLoadingTemplate', { static: false })
  customLoadingTemplate: TemplateRef<any>;
  @ViewChild('searchInput', { static: false }) search: ElementRef;
  orders: number;

  displayedColumns: string[] = [
    'number',
    'user',
    'product_name',
    'price',
    'created_at',
    'Status',
    'Actions',
  ];

  constructor(
    public dialogRef: MatDialog,
    private ordersService: OrdersService,
    private notification: NotificationService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.RefreshServiceData();
  }

  RefreshServiceData() {
    this.dataSource = new OrdersDataSource(this.ordersService);
    this.dataSource.loadOrders(0, this.search.nativeElement.value);
    this.dataSource.mata$
      .pipe(takeUntil(this.$destroy))
      .subscribe((totalNumber) => (this.orders = totalNumber));
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadPage())).subscribe();
    fromEvent(this.search.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadPage();
        })
      )
      .subscribe();
  }

  loadPage() {
    this.dataSource.loadOrders(
      this.paginator.pageIndex,
      this.search.nativeElement.value
    );
  }

  deleteOrder(element: any) {
    this.ordersService.deleteOrder(element._id).subscribe(
      (res: any) => {
        this.notification.successNotification(
          `order ${element.number} deleted successfully`
        );
        this.RefreshServiceData();
      },
      (err: any) => {
        this.notification.errorNotification(err.error.message);
      }
    );
  }

  updateOrder(element: any) {
    const dialogRef = this.dialogRef.open(UpdateOrderComponent, {
      width: '60%',
      data: element,
      autoFocus: true,
      position: {
        left: '30%',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.$destroy))
      .subscribe(() => {
        this.loadPage();
      });
  }

  setOrderStatusBg(status) {
    let color;
    switch (status) {
      case 'received': {
        color = '#121430';
        break;
      }
      case 'paid': {
        color = '#1b82d2';
        break;
      }
      case 'completed': {
        color = '#1b82d2';
        break;
      }
      case 'inProgress': {
        color = '#ef7a1b';
        break;
      }
      case 'finished': {
        color = '#16d7b0';
        break;
      }
      case 'approved': {
        color = '#0ecb62';
        break;
      }
      case 'out': {
        color = '#0ecb62';
        break;
      }
      case 'canceled': {
        color = '#e92929';
        break;
      }
      case 'rejected': {
        color = '#e92929';
        break;
      }
      default: {
        break;
      }
    }

    return color;
  }
}

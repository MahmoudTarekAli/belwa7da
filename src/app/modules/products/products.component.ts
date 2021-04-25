import {
  Component,
  OnInit,
  Optional,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  map,
  distinctUntilChanged,
  debounceTime,
  tap,
  takeUntil,
  filter,
} from 'rxjs/operators';
import { MatDialog, MatPaginator } from '@angular/material';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { Subject } from 'rxjs';
import { NotificationService } from '../../shared/services/notifications/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductsDataSource } from './class/products.datasource';
import { HttpProductsService } from './service/products.service';
import { Router } from '@angular/router';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { PushNotificationService } from '../../shared/services/push-notification/push-notification.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss', '../tabel.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'Image',
    'name',
    'category',
    'price',
    'created_at',
    'Actions',
  ];
  dataSource = new ProductsDataSource(this.httpProductsService);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  $destroy = new Subject<any>();
  loading = false;
  noCities = false;
  totalPromotions: number;
  status = '';
  @ViewChild('searchInput', { static: true }) search: ElementRef;

  constructor(
    @Optional() public dialogRef: MatDialog,
    private httpProductsService: HttpProductsService,
    private changeDetectorRefs: ChangeDetectorRef,
    private notificationService: NotificationService,
    public translate: TranslateService,
    private router: Router,
    private pushNotificationService: PushNotificationService
  ) {}

  ngOnInit() {
    this.refreshServicesData();
    this.pushNotificationService.listen().subscribe((message: any) => {
      this.notificationService.UploadNotification(message.notification.body);
    });
  }

  refreshServicesData() {
    this.noCities = false;
    this.dataSource = new ProductsDataSource(this.httpProductsService);
    this.dataSource.loadProducts$(0, this.search.nativeElement.value);
    this.dataSource.mata$
      .pipe(
        filter((x) => x !== undefined),
        takeUntil(this.$destroy)
      )
      .subscribe((totalNumber) => (this.totalPromotions = totalNumber));

    this.changeDetectorRefs.detectChanges();
  }

  addNewProduct() {
    const dialogRef = this.dialogRef.open(CreateProductComponent, {
      width: '60%',
      height: '80%',
      disableClose: false,
      autoFocus: true,
      position: {
        left: '30%',
      },
    });
    dialogRef.afterClosed().subscribe((next) => {
      this.loadPage();
    });
  }

  updateProduct(element) {
    const dialogRef = this.dialogRef.open(UpdateProductComponent, {
      width: '60%',
      height: '80%',
      data: element,
      disableClose: false,
      autoFocus: true,
      position: {
        left: '30%',
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadPage();
    });
  }

  deleteProduct(element) {
    this.httpProductsService.deleteProduct(element._id).subscribe(
      (data) => {
        if (data.status === 200) {
          this.notificationService.successNotification(
            `Product ${element.options[0].name} Deleted`
          );
          this.refreshServicesData();
        }
      },
      (err) => {
        this.notificationService.errorNotification(err.error.message);
      }
    );
  }

  goToCreateProduct() {
    const getCurrentLang = localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE');
    this.router.navigate([`${getCurrentLang}/create-product`]);
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
    this.dataSource.loadProducts$(
      this.paginator.pageIndex,
      this.search.nativeElement.value
    );
  }

  /*
   destroy the $destroy subject to unsubscribe from all the observable subscribtion
  */
  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }
}

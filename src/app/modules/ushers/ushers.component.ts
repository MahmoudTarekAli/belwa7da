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
import { UshersDataSource } from './class/ushers.datasource';
import { HttpUshersService } from './service/usher.service';
import { Router } from '@angular/router';
// import { UpdateProductComponent } from './components/update-product/update-product.component';
import { CreateUsherComponent } from './components/create-usher/create-usher.component';

@Component({
  selector: 'app-ushers',
  templateUrl: './ushers.component.html',
  styleUrls: ['./ushers.component.scss', '../tabel.scss'],
})
export class UshersComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['name', 'code', 'email', 'mobile', 'Actions'];
  dataSource = new UshersDataSource(this.httpUshersService);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  $destroy = new Subject<any>();
  loading = false;
  noCities = false;
  totalPromotions: number;
  status = '';
  @ViewChild('searchInput') search: ElementRef;

  constructor(
    @Optional() public dialogRef: MatDialog,
    private httpUshersService: HttpUshersService,
    private changeDetectorRefs: ChangeDetectorRef,
    private notificationService: NotificationService,
    public translate: TranslateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.refreshServicesData();
  }

  refreshServicesData() {
    this.noCities = false;
    this.dataSource = new UshersDataSource(this.httpUshersService);
    this.dataSource.loadUshers$(0, this.search.nativeElement.value);
    this.dataSource.mata$
      .pipe(
        filter((x) => x !== undefined),
        takeUntil(this.$destroy)
      )
      .subscribe((totalNumber) => (this.totalPromotions = totalNumber));

    this.changeDetectorRefs.detectChanges();
  }

  addNewUsher() {
    const dialogRef = this.dialogRef.open(CreateUsherComponent, {
      width: '60%',
      height: '42%',
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

  // updateProduct(element) {
  //   const dialogRef = this.dialogRef.open(UpdateProductComponent, {
  //     width: '60%',
  //     height: '80%',
  //     data: element,
  //     disableClose: false,
  //     autoFocus: true,
  //     position: {
  //       left: '30%',
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe(() => {
  //     this.loadPage();
  //   });
  // }

  deleteUsher(element: any) {
    this.httpUshersService.deleteUsher(element._id).subscribe(
      (data) => {
        if (data.status === 200) {
          this.notificationService.successNotification(
            `Usher ${element.name} Deleted`
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
    this.dataSource.loadUshers$(
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

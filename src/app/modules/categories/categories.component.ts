import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { CategoriesDataSource } from './classes/categories.data.source';
import { CategoriesService } from './service/categories.service';
import { NotificationService } from '../../shared/services/notifications/notification.service';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { fromEvent, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { PushNotificationService } from '../../shared/services/push-notification/push-notification.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss', '../tabel.scss'],
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  dataSource = new CategoriesDataSource(this.categoriesService);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  $destroy = new Subject<any>();
  public loadingTemplate: TemplateRef<any>;
  // @ts-ignore
  @ViewChild('customLoadingTemplate', { static: false })
  customLoadingTemplate: TemplateRef<any>;
  @ViewChild('searchInput', { static: true }) search: ElementRef;
  categories: number;

  constructor(
    public dialogRef: MatDialog,
    private categoriesService: CategoriesService,
    private notification: NotificationService,
    private changeDetectorRefs: ChangeDetectorRef,
    private pushNotificationService: PushNotificationService
  ) {}

  displayedColumns: string[] = ['EnName', 'ArName', 'Actions'];

  ngOnInit() {
    this.RefreshServiceData();
    this.pushNotificationService.listen().subscribe((message: any) => {
      this.notification.UploadNotification(message.notification.body);
    });
  }

  addNewCategory() {
    const dialogRef = this.dialogRef.open(AddCategoryComponent, {
      width: '60%',
      disableClose: true,
      autoFocus: true,
      position: {
        left: '30%',
      },
    });
    dialogRef.afterClosed().subscribe((next) => {
      this.loadPage();
    });
  }

  deleteCategory(element) {
    this.categoriesService.deleteCategory(element._id).subscribe(
      (data) => {
        if (data.status === 200) {
          this.notification.successNotification('Deleted');
          this.loadPage();
        }
      },
      (error) => {
        this.notification.errorNotification(error.error.message);
      }
    );
  }

  updateCategory(element) {
    const dialogRef = this.dialogRef.open(UpdateCategoryComponent, {
      width: '60%',
      data: element,
      disableClose: true,
      autoFocus: true,
      position: {
        left: '30%',
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.loadPage();
    });
  }

  RefreshServiceData() {
    this.dataSource = new CategoriesDataSource(this.categoriesService);
    this.dataSource.loadCategories(0, this.search.nativeElement.value);
    this.dataSource.mata$
      .pipe(takeUntil(this.$destroy))
      .subscribe((totalNumber) => (this.categories = totalNumber));
    this.changeDetectorRefs.detectChanges();
    if (this.loadingTemplate) {
      this.loadingTemplate = null;
    } else {
      this.loadingTemplate = this.customLoadingTemplate;
    }
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
    this.dataSource.loadCategories(
      this.paginator.pageIndex,
      this.search.nativeElement.value
    );
  }
}

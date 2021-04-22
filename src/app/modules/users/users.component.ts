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
import { UsersDataSource } from './classes/users.data.source';
import { UsersService } from './service/users.service';
import { NotificationService } from '../../shared/services/notifications/notification.service';
import { fromEvent, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap,
} from 'rxjs/operators';

@Component({
  selector: 'app-categories',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss', '../tabel.scss'],
})
export class UsersComponent implements OnInit, AfterViewInit {
  dataSource = new UsersDataSource(this.categoriesService);
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  $destroy = new Subject<any>();
  public loadingTemplate: TemplateRef<any>;
  // @ts-ignore
  @ViewChild('customLoadingTemplate', { static: false })
  customLoadingTemplate: TemplateRef<any>;
  @ViewChild('searchInput', { static: false }) search: ElementRef;
  categories: number;

  constructor(
    public dialogRef: MatDialog,
    private categoriesService: UsersService,
    private notification: NotificationService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  displayedColumns: string[] = [
    'position',
    'name',
    'mobile',
    'email',
    'Actions',
  ];

  ngOnInit() {
    this.RefreshServiceData();
  }

  RefreshServiceData() {
    this.dataSource = new UsersDataSource(this.categoriesService);
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

  delete(userId: string) {
    this.categoriesService.deleteUser(userId).subscribe(
      (res) => {
        this.notification.successNotification(
          `user ${res.body['name']} deleted successfully`
        );
        this.loadPage();
      },
      (err) => {
        this.notification.errorNotification(err.error.message);
      }
    );
  }
}

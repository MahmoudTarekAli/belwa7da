import {BehaviorSubject, Observable, of} from 'rxjs';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {catchError, finalize, first, tap} from 'rxjs/operators';
import {UsersService} from '../service/users.service';

export class UsersDataSource implements DataSource<any> {

  private categories = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private metaSubject = new BehaviorSubject<any>({});
  public mata$ = this.metaSubject.asObservable();

  public loading$ = this.loadingSubject.asObservable();
  empty = false;

  constructor(private categoriesService: UsersService) {}

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.categories.pipe(
      tap(data => {
        this.empty = !data.length;
      })
    );
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.categories.complete();
    this.loadingSubject.complete();
  }

  loadCategories(pageNumber, $search) {

    this.loadingSubject.next(true);

    this.categoriesService.getAllCategories(pageNumber, $search)
      .pipe(
        first(),
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(data => {
        this.categories.next(data.body.users);
        console.log(data.body)
        this.metaSubject.next(data.body.length);



      });
  }
}

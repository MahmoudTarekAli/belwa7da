import {BehaviorSubject, Observable, of} from 'rxjs';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {catchError, finalize, first, tap} from 'rxjs/operators';
import {OrdersService} from '../service/orders.service';
export class OrdersDataSource implements DataSource<any> {

  private orders = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private metaSubject = new BehaviorSubject<any>({});
  public mata$ = this.metaSubject.asObservable();

  public loading$ = this.loadingSubject.asObservable();
  empty = false;

  constructor(private ordersService: OrdersService) {}

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.orders.pipe(
      tap(data => {
        this.empty = !data.length;
      })
    );
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.orders.complete();
    this.loadingSubject.complete();
  }

  loadOrders(pageNumber, $search) {

    this.loadingSubject.next(true);

    this.ordersService.getAllOrders(pageNumber, $search)
      .pipe(
        first(),
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(data => {
        this.orders.next(data.body.orders);
        // this.orders.next(data.body);
        console.log(data);
        this.metaSubject.next(data.body.length);
      });
  }
}

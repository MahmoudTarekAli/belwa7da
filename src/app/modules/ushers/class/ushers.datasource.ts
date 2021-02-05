import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { catchError, finalize, first, map, filter, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpUshersService } from '../service/usher.service';

@Injectable({
  providedIn: 'root',
})
export class UshersDataSource implements DataSource<any> {
  public dataSubjectUshers = new BehaviorSubject<any[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  private metaSubjectPromotions = new BehaviorSubject<any>({});

  public mata$ = this.metaSubjectPromotions.asObservable();

  public loading$ = this.loadingSubject.asObservable();

  public categoriesData$ = this.dataSubjectUshers.asObservable();

  empty = false;

  constructor(private httpUshersService: HttpUshersService) {}

  connect(): Observable<any[]> {
    return this.dataSubjectUshers.pipe(
      tap((data) => {
        this.empty = !data.length;
      })
    );
  }

  disconnect(): void {
    this.dataSubjectUshers.complete();
    this.loadingSubject.complete();
  }

  loadUshers$($pageNumber, $search) {
    this.loadingSubject.next(true);
    this.httpUshersService
      .getAllUshers($pageNumber, $search)
      .pipe(
        first(),
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((data) => {
        this.dataSubjectUshers.next(data.body.ushers);
        // this.dataSubjectProducts.next(data.body);
        console.log(data.body);
        this.metaSubjectPromotions.next(data.body.length);
      });
  }

  clipperServiceDataSubject$() {
    return this.dataSubjectUshers.asObservable();
  }

  isServiceEmpty$() {
    return this.dataSubjectUshers.pipe(filter((data) => data.length < 1));
  }
}

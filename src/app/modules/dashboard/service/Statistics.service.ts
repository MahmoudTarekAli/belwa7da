import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = environment.base_url;

  constructor(private http: HttpClient) {
  }


  getAllStatistics(): Observable<any> {
    let headers = new HttpHeaders();
    headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      // tslint:disable-next-line:max-line-length
    });
    return this.http.get(`${this.apiUrl}/statictics`, {
      headers: headers,
      observe: 'response'
    });
  }

}

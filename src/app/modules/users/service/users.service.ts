import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.base_url;

  constructor(private http: HttpClient) {
  }


  getAllCategories(
    page = 0,
    search = '',
  ): Observable<any> {
    let headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('pagination', 'true');
    params = params.append('search', search.toString());


    // tslint:disable-next-line:max-line-length
    headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      // tslint:disable-next-line:max-line-length
    });
    return this.http.get(`${this.apiUrl}/users`, {
      params: params,
      headers: headers,
      observe: 'response'
    });
  }

  AddUsers(body) {
    const headers = new HttpHeaders({
      // tslint:disable-next-line:max-line-length
    });
    return this.http.post<any>(`${this.apiUrl}/users`, body, {
      headers: headers,
      observe: 'response'
    });
  }

  deleteCategory(catId) {
    return this.http.delete(`${this.apiUrl}/events/${catId}`, {
      observe: 'response'
    });
  }

  updateCategory(body, categoryId) {
    return this.http.put(`${this.apiUrl}/events/${categoryId}`, body, {
      observe: 'response'
    });
  }

  getAllCountry(): Observable<any> {
    let headers = new HttpHeaders();
    // tslint:disable-next-line:max-line-length
    headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      // tslint:disable-next-line:max-line-length
    });
    return this.http.get(`${this.apiUrl}/countries`, {
      headers: headers,
      observe: 'response'
    });
  }
  getAllCities(CountryName): Observable<any> {
    let headers = new HttpHeaders();
    // tslint:disable-next-line:max-line-length
    headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      // tslint:disable-next-line:max-line-length
    });
    return this.http.get(`${this.apiUrl}/countries/${CountryName}/cities`, {
      headers: headers,
      observe: 'response'
    });
  }

  getUserOrders(id) {
    return this.http.get(`${this.apiUrl}/users/${id}/orders`, {
      observe: 'response'
    });
  }
}

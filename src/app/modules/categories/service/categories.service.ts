import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = environment.base_url;

  constructor(private http: HttpClient) {
  }


  getAllCategories(page = 0, search = ''): Observable<any> {
    let headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('page', (page).toString());
    params = params.append('pagination', 'true');
    params = params.append('search', search.toString());


    // tslint:disable-next-line:max-line-length
    headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      // tslint:disable-next-line:max-line-length
    });
    return this.http.get(`${this.apiUrl}/categories/`, {
      params: params,
      headers: headers,
      observe: 'response'
    });
  }
  getAllCategory(): Observable<any> {
    let headers = new HttpHeaders();
    // tslint:disable-next-line:max-line-length
    headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      // tslint:disable-next-line:max-line-length
    });
    return this.http.get(`${this.apiUrl}/categories/`, {
      headers: headers,
      observe: 'response'
    });
  }

  AddNewCategory(body) {
    const headers = new HttpHeaders({
      // tslint:disable-next-line:max-line-length
    });
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(`${this.apiUrl}/categories`, body, {
      headers: headers,
      observe: 'response'
    });
  }

  deleteCategory(catId) {
    return this.http.delete(`${this.apiUrl}/categories/${catId}`, {
      observe: 'response'
    });
  }

  updateCategory(body, categoryId) {
    return this.http.put(`${this.apiUrl}/categories/${categoryId}`, body, {
      observe: 'response'
    });
  }


}

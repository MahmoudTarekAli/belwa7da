import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private apiUrl = environment.base_url;

  constructor(private http: HttpClient) {
  }


  getAllAreas(page = 0, search = ''): Observable<any> {
    let headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('page', (page).toString());
    params = params.append('pagination', 'true');
    params = params.append('search', search.toString());
    headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.get(`${this.apiUrl}/areas`, {
      params: params,
      headers: headers,
      observe: 'response'
    });
  }

  AddNewArea(body) {
    const headers = new HttpHeaders({
      // tslint:disable-next-line:max-line-length
    });
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(`${this.apiUrl}/areas`, body, {
      headers: headers,
      observe: 'response'
    });
  }

  deleteArea(catId) {
    return this.http.delete(`${this.apiUrl}/areas/${catId}`, {
      observe: 'response'
    });
  }

  updateArea(body, categoryId) {
    return this.http.put(`${this.apiUrl}/areas/${categoryId}`, body, {
      observe: 'response'
    });
  }


}

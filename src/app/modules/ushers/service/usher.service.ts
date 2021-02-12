import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HttpUshersService {
  private apiUrl = environment.base_url;
  constructor(private _httpClient: HttpClient) {}
  public selectedUshersSubject = new BehaviorSubject<any>([]);

  getAllUshers(page = 0, search = '', limit = 10): Observable<any> {
    let params = new HttpParams();

    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());
    params = params.append('search', search.toString());
    params = params.append('pagination', 'true');

    return this._httpClient.get(`${this.apiUrl}/ushers`, {
      params: params,
      observe: 'response',
    });
  }

  deleteUsher(usherId) {
    return this._httpClient.delete(`${this.apiUrl}/ushers/${usherId}`, {
      observe: 'response',
    });
  }

  getSingleUsher(usherId: string) {
    return this._httpClient.get(`${this.apiUrl}/ushers/${usherId}`, {
      observe: 'response',
    });
  }

  sendUsherData(body) {
    return this._httpClient.post(`${this.apiUrl}/ushers`, body, {
      observe: 'response',
    });
  }

  UpdateUsherData(body, categoryId) {
    return this._httpClient.put(`${this.apiUrl}/ushers/${categoryId}`, body, {
      observe: 'response',
    });
  }
}

import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpProductsService {
  private apiUrl = environment.base_url;
  constructor(private _httpClient: HttpClient) { }
  public selectedProductSubject = new BehaviorSubject<any>([]);

  getAllProducts(
    page = 0,
    search = '',
    limit = 10,
  ): Observable<any> {
    let params = new HttpParams();

    params = params.append('page', page.toString());
    params = params.append('limit', limit.toString());
    params = params.append('search', search.toString());
    params = params.append('pagination', 'true');

    return this._httpClient.get(`${this.apiUrl}/products?sort=-created_at&populate=category`, {
      params: params,
      observe: 'response'
    });
  }


  deleteProduct(productId) {
    return this._httpClient.delete(`${this.apiUrl}/products/${productId}`, {
      observe: 'response'
    });
  }

  sendProductData(body) {
    return this._httpClient.post(`${this.apiUrl}/products`, body, {
      observe: 'response'
    });
  }

  UpdateProductData(body, categoryId) {
    return this._httpClient.put(`${this.apiUrl}/products/${categoryId}`, body, {
      observe: 'response'
    });
  }
}

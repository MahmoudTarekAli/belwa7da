import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = environment.base_url;

  constructor(private http: HttpClient) {}

  getAllOrders(page = 0, search = ''): Observable<any> {
    const headers = new HttpHeaders();
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('pagination', 'true');
    params = params.append('order_number', search.toString());
    return this.http.get(`${this.apiUrl}/orders?created_at`, {
      params,
      headers,
      observe: 'response',
    });
  }

  updateOrder(body, OrderId) {
    return this.http.put(`${this.apiUrl}/orders/${OrderId}/status`, body, {
      observe: 'response',
    });
  }

  getSingleOrder(orderId) {
    return this.http.get(`${this.apiUrl}/orders/${orderId}`, {
      observe: 'response',
    });
  }

  deleteOrder(orderId: string) {
    return this.http.delete(`${this.apiUrl}/orders/${orderId}`, {
      observe: 'response',
    });
  }
}

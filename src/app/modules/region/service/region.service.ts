import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl = environment.base_url;

  constructor(private http: HttpClient) {
  }


  getAllRegions(id): Observable<any> {
    return this.http.get(`${this.apiUrl}/areas/${id}/regions`, {
      observe: 'response'
    });
  }

  AddNewArea(body, id) {
    const headers = new HttpHeaders({
      // tslint:disable-next-line:max-line-length
    });
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post<any>(`${this.apiUrl}/areas/${id}/regions`, body, {
      headers: headers,
      observe: 'response'
    });
  }

  deleteArea(catId) {
    return this.http.delete(`${this.apiUrl}/regions/${catId}`, {
      observe: 'response'
    });
  }

  updateRegion(body, areaId, regionId) {
    return this.http.put(`${this.apiUrl}/areas/${areaId}/regions/${regionId}`, body, {
      observe: 'response'
    });
  }


}

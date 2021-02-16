import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const ignore =
      typeof request.body === 'undefined' ||
      request.body === null ||
      request.body.toString() === '[object FormData]';
    if (ignore) {
      const token = this.authService.getToken();
      if (!token) {
        return next.handle(request);
      }
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`,
          'Accept-Language': 'all',
        },
      });
      return next.handle(request);
    }

    const token = this.authService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept-Language': 'all',

          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      });
      return next.handle(request);
    } else {
      return next.handle(request);
    }
  }
}

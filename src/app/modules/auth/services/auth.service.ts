import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.base_url;
  private token: string;
  public tokenSubjectSource = new BehaviorSubject<string>('');
  public tokenSubjectData = this.tokenSubjectSource.asObservable();
  public isLogoutSubject = new BehaviorSubject<boolean>(false);
  public isLogoutState = this.isLogoutSubject.asObservable();

  public isUserOperationSource = new BehaviorSubject<boolean>(false);
  public isUserOperationState = this.isUserOperationSource.asObservable();
  guestToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6Ikd1ZXN0Iiwicm9sZXMiOlsiZ3Vlc3QiXX0.ats4O6FJ8McALpnrNPxZnnPFmnMkU9C30IPgKnxX5p4';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  public saveToken(token: string): void {
    localStorage.setItem('user-token', token);
    this.tokenSubjectSource.next(token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('user-token');
    }
    return this.token;
  }

  public getUserIdWhenLoginIn(): string {
    return localStorage.getItem('userId');
  }

  public getUserPhoneNumber(): string {
    return localStorage.getItem('userPhoneNumber');
  }

  public saveUserId(userId) {
    localStorage.setItem('userId', userId);
  }

  public saveUserPhoneNumber(phoneNumber) {
    localStorage.setItem('userPhoneNumber', phoneNumber);
  }

  public saveUserData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  public getUserRole() {
    return localStorage.getItem('user-role');
  }


  public logOut() {
    localStorage.removeItem('mobile_token');
    localStorage.removeItem('userPhoneNumber');
    localStorage.removeItem('userId');
    localStorage.setItem('clipperToken', null);
    localStorage.removeItem('userData');
  }


  public logout(): void {
    this.token = '';
    localStorage.removeItem('clipperToken');
  }


  public login($userCredentials): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/local/login`, $userCredentials, {
      observe: 'response',
    });
  }

  public Register($userCredentials): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, $userCredentials, {
      observe: 'response',
    });
  }

  public Login($userCredentials): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/local/login`, $userCredentials, {
      observe: 'response',
    });
  }

  public verifyCode($code): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/verify`, $code, {
      observe: 'response',
    });
  }

  // isLoggedIn() {
  //   if (localStorage.getItem('user-token')) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // public requestResetCode($email): Observable<any> {
  //   return this.http.post(`${this.resetBaseUrl}/email`, $email, {
  //     observe: "response",
  //   });
  // }

  // public checkResetCode($code): Observable<any> {
  //   return this.http.post(`${this.resetBaseUrl}/code`, $code, {
  //     observe: "response"
  //   });
  // }

  // public resetPassword($newPassword): Observable<any> {
  //   return this.http.post(`${this.resetBaseUrl}/reset`, $newPassword, {
  //     observe: "response"
  //   });
  // }
}

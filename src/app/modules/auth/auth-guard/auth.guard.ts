import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {
  status: any;
  guestToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6Ikd1ZXN0Iiwicm9sZXMiOlsiZ3Vlc3QiXX0.ats4O6FJ8McALpnrNPxZnnPFmnMkU9C30IPgKnxX5p4';

  constructor(private authService: AuthService, private router: Router) {
  }

  handleGuard() {
    const token = localStorage.getItem('user-token');
    return token !== null ? true : this.router.navigateByUrl('/auth/register');
  }

  canActivate() {
    return this.handleGuard();
  }
}

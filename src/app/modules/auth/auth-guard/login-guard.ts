import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class CanActivateLoginGuard implements CanActivate {
    status: any;
    constructor(private authService: AuthService, private router: Router) {
    }
    handleGuard() {
        return this.authService.getToken() === undefined
            ? true : this.router.navigateByUrl('');
    }

    canActivate() {
        return this.handleGuard();
    }
}

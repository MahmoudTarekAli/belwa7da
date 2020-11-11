import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpResponse } from '@angular/common/http';
import {NotificationService} from '../../../shared/services/notifications/notification.service';

@Component({
  selector: 'app-verfiy-code',
  templateUrl: './verfiy-code.component.html',
  styleUrls: ['./verfiy-code.component.scss']
})
export class VerfiyCodeComponent implements OnInit {
  constructor(
    private fg: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notifcationService: NotificationService
  ) { }

  counter = 30;
  interval = 1000;
  loading = false;
  loadingResend = false;
  userData = {};
  value;
  public verifyCodeForm = this.fg.group({
    userId: ['', Validators.required],
    token: ['', Validators.required],
  });
  ngOnInit() {
    this.verifyCodeForm.controls.userId.setValue(localStorage.getItem('userId'));
  }





  requiredErrorMessage($feild) {
    return this.verifyCodeForm.controls[$feild].hasError("required")
      ? "You must enter a value"
      : "";
  }

  resendCode() {
    const userMobileNumber = this.authService.getUserPhoneNumber();
    let userCredentials = {
      mobile: userMobileNumber,
      type: "admin"
    };

    if (!this.loadingResend) {
      this.loadingResend = true;
      this.authService.login(userCredentials).subscribe(
        (resp: HttpResponse<any>) => {
          if (resp.status === 200) {
            this.verifyCodeForm.controls.mobile.setValue(resp.body.mobile_token);
            this.authService.saveUserId(resp.body.id);
            localStorage.setItem('mobile_token', resp.body.mobile_token);
            this.loadingResend = false;
          }
        },
        err => {
          this.loadingResend = false;
          this.notifcationService.errorNotification(err.error.message);
        }
      );
    }
  }

  // verifyCode() {
  //   const data = {
  //     mobile_token: localStorage.getItem('mobile_token'),
  //     userId: localStorage.getItem('userId')
  //   }
  //   this.isValidCode(data);
  // }

  verify() {
    const userData = {
      id: localStorage.getItem('userId'),
      token: this.verifyCodeForm.controls.token.value.toString()
    }
    this.authService.verifyCode(userData).subscribe(resp => {
      if (resp.status === 200) {
        localStorage.setItem('user-token', resp.body.token);
        this.router.navigateByUrl('');
      }
    }, err => {
        this.notifcationService.errorNotification(err.error.message);
    })
  }
}

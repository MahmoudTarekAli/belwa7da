import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {NotificationService} from '../../../shared/services/notifications/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading = false;
  userData = {};

  isLogin = true;
  isRegister = false;

  constructor(
    private fg: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
  }

  // public RegistrationForm = this.fg.group({
  //   name: ["", Validators.required],
  //   email: ["", Validators.required],
  //   password: ["", Validators.required],
  //   mobile: ["", Validators.required]
  // });

  public LoginForm = this.fg.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  // public verifyCodeForm = this.fg.group({
  //   userId: ["", Validators.required],
  //   token: ["", Validators.required]
  // });
  ngOnInit() {
    // this.verifyCodeForm.controls.userId.setValue(
    //   localStorage.getItem("userId")
    // );
  }

  // requiredErrorMessage($feild) {
  //   return this.RegistrationForm.controls[$feild].hasError('required')
  //     ? 'You must enter a value'
  //     : '';
  // }

  // register() {
  //   const userCredentials = {
  //     name: this.RegistrationForm.controls.name.value.toString(),
  //     email: this.RegistrationForm.controls.email.value.toString(),
  //     password: this.RegistrationForm.controls.password.value.toString(),
  //     mobile: this.RegistrationForm.controls.mobile.value.toString()
  //   };
  //   console.log(userCredentials);
  //   console.log(userCredentials.mobile.charAt(0));
  //   if (userCredentials.mobile.charAt(0) !== "+") {
  //     this.notificationService.errorNotification(
  //       "Please enter (+) before the phone number"
  //     );
  //     return;
  //   }
  //   if (this.RegistrationForm.invalid) {
  //     this.notificationService.errorNotification(
  //       "Please Enter Valid Phone Number"
  //     );
  //     return;
  //   }
  //   if (this.RegistrationForm.valid && !this.loading) {
  //     console.log("i am here");
  //     this.loading = true;
  //     this.authService.Register(userCredentials).subscribe(
  //       (resp: HttpResponse<any>) => {
  //         if (resp.status === 200) {
  //           // save user id
  //           this.authService.saveUserId(resp.body._id);
  //           // just for development
  //           this.isRegister = true;
  //           this.rotate();
  //         }
  //       },
  //       err => {
  //         this.loading = false;
  //         this.notificationService.errorNotification(err.error.message);
  //       }
  //     );
  //   }
  // }

  login() {
    const LoginData = {
      username: this.LoginForm.controls.username.value.toString(),
      password: this.LoginForm.controls.password.value.toString()
    };
    // console.log(LoginData.mobile.charAt(0));
    // if (LoginData.username.charAt(0) !== '+') {
    //   this.notificationService.errorNotification(
    //     'Please enter (+) before the phone number'
    //   );
    //   return;
    // }
    if (this.LoginForm.invalid) {
      this.notificationService.errorNotification('Please Enter Valid Data');
      return;
    }
    if (this.LoginForm.valid) {
      this.loading = true;
      this.authService.Login(LoginData).subscribe(
        (resp: HttpResponse<any>) => {
          if (resp.status === 200) {
            // save user id
            if (resp.body.user.roles[0] === 'admin') {
              this.authService.saveToken(resp.body.token);
              this.authService.saveUserId(resp.body.user._id);
              localStorage.setItem('user-role', resp.body.user.roles[0]);
              // just for development
              this.router.navigateByUrl('category');
            } else {
              this.notificationService.errorNotification('please try again');
            }
          }
        },
        err => {
          this.loading = false;
          this.notificationService.errorNotification(err.error.message);
        }
      );
    }
  }

  // verify() {
  //   const userData = {
  //     id: localStorage.getItem('userId'),
  //     token: this.verifyCodeForm.controls.token.value.toString()
  //   };
  //   console.log(userData);
  //   this.authService.verifyCode(userData).subscribe(
  //     resp => {
  //       if (resp.status === 200) {
  //         localStorage.setItem('user-token', resp.body.token);
  //         console.log(resp);
  //         this.router.navigateByUrl('');
  //       }
  //     },
  //     err => {
  //       this.notificationService.errorNotification(err.error.message);
  //     }
  //   );
  // }
  // setUserDataToLocalStorage(userData) {
  //   localStorage.setItem('user', JSON.stringify(userData.id));
  // }

  // rotate() {
  //   if (this.isLogin === true) {
  //     this.isLogin = false;
  //   } else {
  //     this.isLogin = true;
  //   }
  // }
}

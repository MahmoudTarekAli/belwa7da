import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { UsersService } from '../../../modules/users/service/users.service';
import { NotificationService } from '../notifications/notification.service';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  constructor(
    private afMessaging: AngularFireMessaging,
    private notificationService: NotificationService,
    private userService: UsersService
  ) {
    console.log('here');

    this.afMessaging.messaging.subscribe((_messaging) => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      _messaging.onBackgroundMessage = _messaging.onBackgroundMessage.bind(
        _messaging
      );
    });
  }

  requestPermission() {
    this.afMessaging.requestToken.subscribe((token) => {
      console.log('permission granted', token);
      const id = localStorage.getItem('userId');
      const data = {
        fcm_token: token,
      };
      this.userService.updateUserFCMToken(id, data).subscribe(
        (res) => {
          console.log('done');
        },
        (err) => {
          console.log(err);
        }
      );
    });
    this.afMessaging.tokenChanges.subscribe((token) => {
      const id = localStorage.getItem('userId');
      const data = {
        fcm_token: token,
      };
      this.userService.updateUserFCMToken(id, data).subscribe(
        (res) => {
          console.log('done');
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  listen() {
    return this.afMessaging.messages;
  }
}

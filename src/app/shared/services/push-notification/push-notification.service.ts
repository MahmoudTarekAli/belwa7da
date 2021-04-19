import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import { mergeMapTo } from 'rxjs/operators';

@Injectable()
export class PushNotificationService {
  currentMessage = new BehaviorSubject(null);
  constructor(private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messaging.subscribe((_messaging) => {
      _messaging.onMessage((payload) => {
        console.log('gererer', payload);
      });
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    });
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log('permission granted', token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload) => {
      console.log('new message received. ', payload);
      this.currentMessage.next(payload);
      this.showCustomNotification(payload);
    });
  }

  showCustomNotification(payload: any) {
    let notify_data = payload['notification'];
    let title = payload['title'];
    let options = {
      body: notify_data['body'],
    };
    console.log('new message received');
    let notify: Notification = new Notification(title, options);
  }
}

// https://www.youtube.com/watch?v=5rDd4_-dMFo&ab_channel=RomanJustCodes

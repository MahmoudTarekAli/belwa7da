import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { NotificationService } from './shared/services/notifications/notification.service';
import { AngularFireMessaging } from '@angular/fire/messaging';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  message: any;
  constructor(
    private notificationService: NotificationService,
    private afMessaging: AngularFireMessaging
  ) {}

  ngOnInit() {
    this.requestPermission();
    this.listen();
  }

  requestPermission() {
    this.afMessaging.requestToken.subscribe((token) => {
      console.log('permission granted', token);
    });
  }

  listen() {
    this.afMessaging.messages.subscribe((message: any) => {
      console.log(message);
      this.notificationService.successNotification(message.notification.body);
    });
  }
}

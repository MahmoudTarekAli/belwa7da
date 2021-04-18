import { Component, OnInit } from '@angular/core';
import { NotificationService } from './shared/services/notifications/notification.service';
import { PushNotificationService } from './shared/services/push-notification/push-notification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  message: any;
  constructor(
    private pushNotificationService: PushNotificationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.pushNotificationService.requestPermission();
    this.pushNotificationService.receiveMessage();

    // this.notificationService.warningNotification(
    //   this.pushNotificationService.currentMessage
    // );
  }
}

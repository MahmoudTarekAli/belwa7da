import { Component, OnInit } from '@angular/core';
import { NotificationService } from './shared/services/notifications/notification.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  message: any;
  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    // this.notificationService.warningNotification(
    //   this.pushNotificationService.currentMessage
    // );
  }
}

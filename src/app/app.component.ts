import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
=======
import { NotificationService } from './shared/services/notifications/notification.service';
>>>>>>> d7259e19c610c86f6187bedb6ac9e9effdd8443c
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
<<<<<<< HEAD
  constructor() {}

  ngOnInit() {}
=======
  message: any;
  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    // this.notificationService.warningNotification(
    //   this.pushNotificationService.currentMessage
    // );
  }
>>>>>>> d7259e19c610c86f6187bedb6ac9e9effdd8443c
}

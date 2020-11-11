import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {NotificationService} from '../../../shared/services/notifications/notification.service';
import {switchMap} from 'rxjs/operators';
import {Location} from '@angular/common';
import {UsersService} from '../service/users.service';

@Component({
  selector: 'app-user-order-details',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss', '../../tabel.scss']
})
export class UserOrdersComponent implements OnInit {
  order: any;
  private previousUrl: string;
  private currentUrl: string;

  constructor(private activeRoute: ActivatedRoute,
              private usersService: UsersService,
              private router: Router,
              private notificationService: NotificationService,
              private locations: Location
  ) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  ngOnInit() {

    this.activeRoute.paramMap
      .pipe(
        switchMap(x => this.singleOrder(x.get('id')))
      )
      .subscribe(data => {
        this.order = data.body;
        console.log(data);
        console.log(this.order);
      });
  }

  singleOrder(id) {
    return this.usersService.getUserOrders(id);
  }
}

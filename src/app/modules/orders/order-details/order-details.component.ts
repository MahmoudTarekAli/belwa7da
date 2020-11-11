import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {OrdersService} from '../service/orders.service';
import {NotificationService} from '../../../shared/services/notifications/notification.service';
import {switchMap} from 'rxjs/operators';
import {Location} from '@angular/common';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss', '../../tabel.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: any;
  private previousUrl: string;
  private currentUrl: string;

  constructor(private activeRoute: ActivatedRoute,
              private httpOrderService: OrdersService,
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
      ;
    });
  }

  ngOnInit() {

    this.activeRoute.paramMap
      .pipe(
        switchMap(x => this.singleOrder(x.get('id')))
      )
      .subscribe(data => {
        this.order = data.body;
        console.log(this.order);
      });
  }

  singleOrder(orderId) {
    return this.httpOrderService.getSingleOrder(orderId);
  }


  backClicked() {
    this.router.navigate(['/orders']);
  }

  navigate(id) {
    this.router.navigate(['locations/location-details', id]);
  }
}

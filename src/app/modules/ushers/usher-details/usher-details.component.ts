import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpUshersService } from '../service/usher.service';
import { NotificationService } from '../../../shared/services/notifications/notification.service';
import { switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ushers-details',
  templateUrl: './usher-details.component.html',
  styleUrls: ['./usher-details.component.scss', '../../tabel.scss'],
})
export class UsherDetailsComponent implements OnInit {
  order: any;
  private previousUrl: string;
  private currentUrl: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private httpUshersService: HttpUshersService,
    private router: Router,
    private notificationService: NotificationService,
    private locations: Location
  ) {
    this.currentUrl = this.router.url;
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });
  }

  ngOnInit() {
    this.activeRoute.paramMap
      .pipe(switchMap((x) => this.singleOrder(x.get('id'))))
      .subscribe((data) => {
        // @ts-ignore
        this.order = data.body;
        console.log(this.order);
      });
  }

  singleOrder(orderId) {
    return this.httpUshersService.getAllUshers(orderId);
  }

  backClicked() {
    this.router.navigate(['/orders']);
  }

  navigate(id) {
    this.router.navigate(['locations/location-details', id]);
  }
}

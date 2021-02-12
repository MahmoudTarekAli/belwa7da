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
  usher: any;
  private previousUrl: string;
  private currentUrl: string;
  displayedColumns = ['name', 'email', 'mobile', 'actions'];

  constructor(
    private activeRoute: ActivatedRoute,
    private httpUshersService: HttpUshersService,
    private router: Router,
    private notificationService: NotificationService
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
      .pipe(switchMap((x) => this.singleUsher(x.get('id'))))
      .subscribe((data) => {
        // @ts-ignore
        this.usher = data.body;
        console.log(this.usher);
      });
  }

  singleUsher(usherId: string) {
    return this.httpUshersService.getSingleUsher(usherId);
  }

  backClicked() {
    this.router.navigate(['/ushers']);
  }

  deleteUser(userId: string) {}
}

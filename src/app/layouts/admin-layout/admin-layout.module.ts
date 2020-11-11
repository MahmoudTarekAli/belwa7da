import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { SharedModule } from '../../shared/shared.module';
import { MainDashboardRoutingModule } from './admin-layout.routing';
import { AdminLayoutComponent } from './admin-layout.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MainDashboardRoutingModule,
  ],
  declarations: [
    NotificationsComponent,
    AdminLayoutComponent
  ],
  entryComponents: [
  ],
  exports: [
  ],
  providers: [
  ]

})

export class AdminLayoutModule { }

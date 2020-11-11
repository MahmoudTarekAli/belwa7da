import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {MaterialImportsModule} from '../../shared/material-imports/material-imports.module';
import {UsersComponent} from './users.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {UserOrdersComponent} from './user-orders/user-orders.component';

@NgModule({
  declarations: [ UsersComponent, UserOrdersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialImportsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [],
  providers: [DatePipe]
})
export class UsersModule { }

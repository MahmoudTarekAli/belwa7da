import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './users.component';
import {UserOrdersComponent} from './user-orders/user-orders.component';

const routes: Routes = [{
  path: '',
  component: UsersComponent
},
  {
    path: ':id/orders',
    component: UserOrdersComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}

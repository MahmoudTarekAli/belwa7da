import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import {OrdersComponent} from './orders.component';
import {SharedModule} from '../../shared/shared.module';
import { UpdateOrderComponent } from './components/update-order/update-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

@NgModule({
  declarations: [OrdersComponent, UpdateOrderComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModule
  ],
  entryComponents: [UpdateOrderComponent]
})
export class OrdersModule { }

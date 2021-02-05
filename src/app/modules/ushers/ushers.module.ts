import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../../shared/shared.module';
import {UshersRoutingModule} from './ushers.routing';
import { CreateUsherComponent } from './components/create-usher/create-usher.component';
import { UshersComponent } from './ushers.component';
import { UsherDetailsComponent } from './usher-details/usher-details.component';

@NgModule({
  declarations: [CreateUsherComponent, UshersComponent, UsherDetailsComponent],
  imports: [CommonModule, SharedModule, UshersRoutingModule],
  entryComponents: [CreateUsherComponent]
})
export class UshersModule {
}

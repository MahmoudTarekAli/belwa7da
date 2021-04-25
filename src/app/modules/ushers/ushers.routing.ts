import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UshersComponent } from './ushers.component';
import { UsherDetailsComponent } from './usher-details/usher-details.component';

const routes: Routes = [
  {
    path: '',
    component: UshersComponent,
  },
  {
    path: ':id',
    component: UsherDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UshersRoutingModule {}

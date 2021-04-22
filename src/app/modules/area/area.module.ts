import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreaRoutingModule } from './area-routing.module';
import { MaterialImportsModule } from '../../shared/material-imports/material-imports.module';
import { AreaComponent } from './area.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AddAreaComponent } from './components/add-area/add-area.component';
import { UpdateAreaComponent } from './components/update-area/update-area.component';
import { AddRegionComponent } from '../region/components/add-region/add-region.component';
import { UpdateRegionComponent } from '../region/components/update-region/update-region.component';
import { AllRegionComponent } from '../region/components/all-region/all-region.component';

@NgModule({
  declarations: [
    AddAreaComponent,
    AreaComponent,
    UpdateAreaComponent,
    AddRegionComponent,
    UpdateRegionComponent,
    AllRegionComponent,
  ],
  imports: [
    CommonModule,
    AreaRoutingModule,
    MaterialImportsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  entryComponents: [
    AddAreaComponent,
    UpdateAreaComponent,
    AddRegionComponent,
    UpdateRegionComponent,
    AllRegionComponent,
  ],
})
export class AreaModule {}

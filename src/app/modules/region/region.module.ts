import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionRoutingModule } from './region-routing.module';
import {MaterialImportsModule} from '../../shared/material-imports/material-imports.module';
import {RegionComponent} from './region.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [RegionComponent],
  imports: [
    CommonModule,
    RegionRoutingModule,
    MaterialImportsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: []
})
export class RegionModule { }

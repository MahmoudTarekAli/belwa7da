import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import {MaterialImportsModule} from '../../shared/material-imports/material-imports.module';
import {CategoriesComponent} from './categories.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';

@NgModule({
  declarations: [AddCategoryComponent, CategoriesComponent, UpdateCategoryComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MaterialImportsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [AddCategoryComponent, UpdateCategoryComponent]
})
export class CategoriesModule { }

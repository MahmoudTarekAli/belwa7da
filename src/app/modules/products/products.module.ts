import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products.routing';
import {UpdateProductComponent} from './components/update-product/update-product.component';
import {CreateProductComponent} from './components/create-product/create-product.component';

@NgModule({
  imports: [CommonModule, SharedModule, ProductsRoutingModule],
  declarations: [ProductsComponent, UpdateProductComponent, CreateProductComponent],
  entryComponents: [UpdateProductComponent, CreateProductComponent]
})
export class ProductsModule { }

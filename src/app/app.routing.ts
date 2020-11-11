import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {UserlayoutComponent} from './core/userlayout/userlayout.component';
import {CanActivateViaAuthGuard} from './modules/auth/auth-guard/auth.guard';
import {CanActivateAdminGuard} from './modules/auth/auth-guard/adminAuth.guard';


export const routes: Routes = [
  {
    path: '',
    component: UserlayoutComponent,
    canActivate: [CanActivateAdminGuard],
    children: [
      {
        path: 'users',
        loadChildren: './modules/users/users.module#UsersModule',
        canActivate: [CanActivateAdminGuard],
      },
      {
        path: 'category',
        loadChildren: './modules/categories/categories.module#CategoriesModule',
        canActivate: [CanActivateAdminGuard],

      },
      {
        path: 'areas',
        loadChildren: './modules/area/area.module#AreaModule',
        canActivate: [CanActivateAdminGuard],
      },
      {
        path: 'regions',
        loadChildren: './modules/region/region.module#RegionModule',
        canActivate: [CanActivateAdminGuard],
      },
      {
        path: 'products',
        loadChildren:
          './modules/products/products.module#ProductsModule',
        canActivate: [CanActivateAdminGuard],

      },
      {
        path: 'orders',
        loadChildren: './modules/orders/orders.module#OrdersModule',
        canActivate: [CanActivateAdminGuard],

      },
      {
        path: '',
        redirectTo: 'category',
        pathMatch: 'full'
      }

    ]
  },
  {
    path: 'auth',
    loadChildren: './modules/auth/auth.module#AuthModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

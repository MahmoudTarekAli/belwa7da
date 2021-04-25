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
        loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
        canActivate: [CanActivateAdminGuard],
      },
      {
        path: 'category',
        loadChildren: () => import('./modules/categories/categories.module').then(m => m.CategoriesModule),
        canActivate: [CanActivateAdminGuard],

      },
      {
        path: 'areas',
        loadChildren: () => import('./modules/area/area.module').then(m => m.AreaModule),
        canActivate: [CanActivateAdminGuard],
      },
      {
        path: 'regions',
        loadChildren: () => import('./modules/region/region.module').then(m => m.RegionModule),
        canActivate: [CanActivateAdminGuard],
      },
      {
        path: 'products',
        loadChildren:
          () => import('./modules/products/products.module').then(m => m.ProductsModule),
        canActivate: [CanActivateAdminGuard],

      },
      {
        path: 'orders',
        loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule),
        canActivate: [CanActivateAdminGuard],

      },
      {
        path: 'ushers',
        loadChildren: () => import('./modules/ushers/ushers.module').then(m => m.UshersModule),
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
    loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import { Routes, RouterModule } from '@angular/router';


import { NgModule } from '@angular/core';
import { LocalizeRouterModule } from 'localize-router';
import { TranslateModule } from '@ngx-translate/core';
import { AdminLayoutComponent } from './admin-layout.component';

export const AdminLayoutRoutes: Routes = [
    { path: '', component: AdminLayoutComponent },
];

@NgModule({
    imports: [
        TranslateModule,
        LocalizeRouterModule.forChild(AdminLayoutRoutes),
        RouterModule.forChild(AdminLayoutRoutes)
    ],
    exports: [RouterModule]
})
export class MainDashboardRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },

];

@NgModule({
    imports: [
        TranslateModule,
        RouterModule.forChild(routes),
        LocalizeRouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }

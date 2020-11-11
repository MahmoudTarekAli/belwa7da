import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VerfiyCodeComponent } from './verfiy-code/verfiy-code.component';
import {RegisterComponent} from './register/register.component';

export const AuthRoutes: Routes = [
    {
        path: '',
        redirectTo: 'register',
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: { num: 1 }
    },
    { path: 'verify-user', component: VerfiyCodeComponent, data: { num: 5 } }
];


@NgModule({
    imports: [
        RouterModule.forChild(AuthRoutes),
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule { }

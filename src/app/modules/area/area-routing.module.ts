import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AreaComponent} from './area.component';

const routes: Routes = [{
    path: '',
    component: AreaComponent
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AreaRoutingModule {
}

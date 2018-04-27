import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupRestrictedHomeComponent } from './group-restricted-home/group-restricted-home.component';

const routes: Routes = [
    { path: '', component: GroupRestrictedHomeComponent }
];

@NgModule( {
    imports: [RouterModule.forChild( routes )],
    exports: [RouterModule]
} )
export class GroupRestrictedRoutingModule { }

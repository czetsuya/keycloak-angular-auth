import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRestrictedRoutingModule } from './group-restricted-routing.module';
import { GroupRestrictedHomeComponent } from './group-restricted-home/group-restricted-home.component';

@NgModule({
  imports: [
    CommonModule,
    GroupRestrictedRoutingModule
  ],
  declarations: [GroupRestrictedHomeComponent]
})
export class GroupRestrictedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuredRoleRoutingModule } from './secured-role-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    CommonModule,
    SecuredRoleRoutingModule
  ],
  declarations: [HomeComponent]
})
export class SecuredRoleModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermissionGuard } from 'app/core/model/permission-guard';
import { AuthGuardService as AuthGuard } from 'app/core/guard/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { SecuredComponent } from './secured/secured.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent },
	{ path: 'secured', canActivate: [AuthGuard], component: SecuredComponent },
	{
		path: 'secured-role',
		canLoad: [AuthGuard],
		loadChildren: 'app/secured-role/secured-role.module#SecuredRoleModule',
		data: {
			Permission: {
				Role: 'AppRole',
				RedirectTo: '403'
			} as PermissionGuard
		}
	},
	{
		path: 'groupRestricted',
		canLoad: [AuthGuard],
		loadChildren: 'app/group-restricted/group-restricted.module#GroupRestrictedModule',
		data: {
			Permission: {
				Only: ['User'],
				RedirectTo: '403'
			} as PermissionGuard
		}
	},

	{ path: '403', component: ForbiddenComponent },
	{ path: '404', component: NotFoundComponent },

	{ path: '**', redirectTo: '404' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

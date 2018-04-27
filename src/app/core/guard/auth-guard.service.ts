import { Injectable } from '@angular/core';
import { Route, Router, RouterStateSnapshot, ActivatedRouteSnapshot, CanActivate, CanLoad } from '@angular/router';

import { PermissionGuard } from 'app/core/model/permission-guard';
import { KeycloakService } from 'app/core/auth/keycloak.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

    constructor( public router: Router, private keycloakService: KeycloakService ) {
    }

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
        let url: string = state.url;
        return this.checkLogin( url );
    }

    /**
     * Checks if a user is logged in before activating the secured page.
     * @param url
     */
    checkLogin( url: string ): boolean {
        if ( KeycloakService.auth.loggedIn && KeycloakService.auth.authz.authenticated ) {
            return true;
        } else {
            KeycloakService.login();
            return false;
        }
    }

    /**
     * Checks if the logged in user have enough privilege to load the page. Group can be specified in the app-routing.module routes. 
     * Note that currently keycloak is not sending the list of roles that's why we are using groups.
     * @param route The route
     */
    canLoad( route: Route ): boolean {
        if ( KeycloakService.auth.loggedIn && KeycloakService.auth.authz.authenticated ) {

        } else {
            KeycloakService.login();
            return false;
        }

        let data = route.data["Permission"] as PermissionGuard;

        if ( Array.isArray( data.Only ) && Array.isArray( data.Except ) ) {
            throw "Can't use both 'Only' and 'Except' in route data.";
        }

        if ( Array.isArray( data.Only ) ) {
            let hasDefined = KeycloakService.hasGroups( data.Only )
            if ( hasDefined )
                return true;

            if ( data.RedirectTo && data.RedirectTo !== undefined )
                this.router.navigate( [data.RedirectTo] );

            return false;
        }

        if ( Array.isArray( data.Except ) ) {
            let hasDefined = KeycloakService.hasGroups( data.Except )
            if ( !hasDefined )
                return true;

            if ( data.RedirectTo && data.RedirectTo !== undefined )
                this.router.navigate( [data.RedirectTo] );

            return false;
        }
    }

}
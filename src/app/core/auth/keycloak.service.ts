import { Injectable } from '@angular/core';

import { environment } from 'environments/environment';

declare var Keycloak: any;

@Injectable()
export class KeycloakService {

    static auth: any = {};
    static redirectUrl: string;
    static clientRoles: string[];

    static init(): Promise<any> {
        let keycloakAuth: any = new Keycloak( 'assets/keycloak.json' );
        KeycloakService.auth.loggedIn = false;

        return new Promise(( resolve, reject ) => {
            keycloakAuth.init( { onLoad: 'check-sso' } )
                .success(() => {
                    KeycloakService.auth.loggedIn = true;
                    KeycloakService.auth.authz = keycloakAuth;
                    KeycloakService.auth.logoutUrl = keycloakAuth.authServerUrl + "/realms/" + environment.keycloakRealm + "/protocol/openid-connect/logout?redirect_uri=" + environment.baseUrl + "/index.html";

                    resolve();
                } )
                .error(() => {
                    reject();
                } );
        } );
    }

    static hasGroup( groupName: string ): boolean {
        return KeycloakService.auth.authz != null && KeycloakService.auth.authz.authenticated && KeycloakService.auth.authz.idTokenParsed.groups.indexOf( "/" + groupName ) !== -1 ? true : false;
    }

    static hasGroups( groupNames: string[] ): boolean {
        if ( !groupNames ) {
            return false;
        }
        return groupNames.some( e => {
            if ( typeof e === "string" ) {
                return KeycloakService.hasGroup( e );
            }
        } );
    }

    static logout() {
        console.log( '*** LOGOUT' );
        KeycloakService.auth.loggedIn = false;
        KeycloakService.auth.authz = null;
        console.log( KeycloakService.auth.logoutUrl );
        window.location.href = KeycloakService.auth.logoutUrl;
    }

    static login() {
        KeycloakService.auth.authz.login().success( function() {
            KeycloakService.auth.authz.initPromise.setSuccess();
        } ).error( function() {
            KeycloakService.auth.authz.initPromise.setError();
        } );
    }

    static getToken(): Promise<string> {
        return new Promise<string>(( resolve, reject ) => {
            if ( KeycloakService.auth.authz.token ) {
                KeycloakService.auth.authz.updateToken( 5 )
                    .success(() => {
                        resolve( <string>KeycloakService.auth.authz.token );
                    } )
                    .error(() => {
                        reject( 'Failed to refresh token' );
                    } );
            }
        } );
    }

    static isLogged() {
        return KeycloakService.auth.authz != null && KeycloakService.auth.authz.authenticated;
    }
}
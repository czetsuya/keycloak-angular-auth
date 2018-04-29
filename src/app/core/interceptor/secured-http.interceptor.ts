import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { KeycloakService } from 'app/core/auth/keycloak.service';

@Injectable()
export class SecuredHttpInterceptor implements HttpInterceptor {

    /**
     * Intercepts the http request and add the bearer token of the currently logged user.
     * 
     * @param request http request
     * @param next http handler
     */
    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        //const started = Date.now();
        if ( KeycloakService.auth.authz != null && KeycloakService.auth.loggedIn && KeycloakService.auth.authz.authenticated ) {
            KeycloakService.getToken();
            let kcToken = KeycloakService.auth.authz.token;
            request = request.clone( {
                setHeaders: {
                    Authorization: 'Bearer ' + kcToken
                }
            } );
        }
        return next.handle( request );
    }
}
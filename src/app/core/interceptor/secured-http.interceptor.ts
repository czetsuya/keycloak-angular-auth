import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { KeycloakService } from 'app/core/auth/keycloak.service';

@Injectable()
export class SecuredHttpInterceptor implements HttpInterceptor {

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler

    ): Observable<HttpEvent<any>> {
        //const started = Date.now();
        KeycloakService.getToken();
        let kcToken = KeycloakService.auth.authz.token;
        if ( KeycloakService.auth.loggedIn && KeycloakService.auth.authz.authenticated ) {
            request = request.clone( {
                setHeaders: {
                    Authorization: 'Bearer ' + kcToken
                }
            } );
        }
        return next.handle( request );
    }
}
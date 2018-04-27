import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { SecuredHttpInterceptor } from 'app/core/interceptor/secured-http.interceptor';
import { AuthGuardService } from "app/core/guard/auth-guard.service";
import { KeycloakService } from "./core/auth/keycloak.service";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SecuredComponent } from './secured/secured.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule( {
    declarations: [
        AppComponent,
        HomeComponent,
        SecuredComponent,
        ForbiddenComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,

        RouterModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [
        KeycloakService,
        AuthGuardService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SecuredHttpInterceptor,
            multi: true
        },
    ],
    bootstrap: [AppComponent]
} )
export class AppModule { }

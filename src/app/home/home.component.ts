import { Component, OnInit } from '@angular/core';

import { KeycloakService } from "app/core/auth/keycloak.service";

@Component( {
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
} )
export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
    
    getKeycloakService() {
        return KeycloakService;
    }

}

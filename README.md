This project was tested on:
 - node v10.0.0
 - npm v6.0.0
 - ng v1.7.4

Prerequisites

Keycloak
--
 - Installed keycloak server on your local environment. I'm using version 3.4.1.
 - Login to your keycloak and import the realm in config/keycloak-auth-realm.json.
 - Import the user from config/keycloak-auth-users-0.json. Account is edward / edward.
 - You can create your own user, just make sure to add him / her to the User group.
 
Angular
--
 - Install keycloak: npm install keycloak-js@latest --save 
 
Notes
--
  - Keycloak is injected and initialized at main.ts.
  - keycloakRealm and keycloakBaseUrl must be set in src/environments/environment.ts.
  - src/assets/keycloak.json, is where we defined the keycloak client configuration.
  
  
*Make sure that keycloak is running before running this app on ng serve. This project is calling keycloak from port 8380, you may want to change that to 8080 if you deploy keycloak as default (src/environments/environment.ts).
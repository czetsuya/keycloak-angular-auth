Prerequisites

Keycloak
--
 - Installed keycloak server on your local environment. I'm using version 3.4.1.
 - Login to your keycloak and import the realm in config/keycloak-auth-realm.json.
 - Import the user from keycloak-auth-users-0.json. Account is edward / edward.
 - You can create your own user, just make sure to add him / her to the User group.
 
Angular
--
 - Install keycloak: npm install keycloak-js@latest --save 
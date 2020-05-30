[![patreon](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/bePatron?u=12280211)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

# Angular 9 Keycloak Integration

This is a project template that integrates Keycloak authentication server to an Angular5 project.

It provides an authentication guard service that can restrict a component from being accessible if a user is not logged in.

Blog: https://czetsuya-tech.blogspot.com/2019/08/how-to-secure-angular-app-with-keycloak.html

## Features

 - Restricts a component from being accessible, if a user is not logged in.
 - Restricts access of lazily loaded modules by groups.
 - Restricts access of lazily loaded modules by role.
 
## Requirements

This project was tested on:
 - node v12.17.0
 - npm v6.15.5
 - angular/cli v9.1.7
 - Keycloak 10.0.1
 - Wildfly 19.0.1

To update the angular CLI version:

```sh
npm uninstall --save-dev angular-cli
npm cache verify
npm install --save-dev @angular/cli@latest
```

To update the dependencies

```sh
npm i -g npm-check-updates
ncu -u
npm install
```

## Instructions

### Keycloak

 - Install keycloak server on your local environment. I'm using version 10.0.1.
 - Or use a docker image. To run : docker run --name=keycloak10 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=kerri -p 8080:8080 jboss/keycloak:10.0.1.
 - Login to keycloak and import the realm in config/keycloak-auth-realm.json.
 - The import will also create users. Account is edward / edward (with group User, has APIAccess role). kerri / kerri (with role AppRole).
 - You can create your own user, just make sure to add him / her to the User group.
 - Don't forget to map Group Membership to "groups".
 
### Angular

 - Install keycloak: npm install keycloak-js@latest --save 
 
### How-to

The following are configurations on how to secure routes.

1.) To secure a component by authenticated user:

```
{ path: 'secured', canActivate: [AuthGuard], component: SecuredComponent },
```

2.) To secure a module by group membership:

```
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
}
```

3.) To secure a module by role membership:

```
{
    path: 'secured-role',
    canLoad: [AuthGuard],
    loadChildren: 'app/group-restricted/group-restricted.module#GroupRestrictedModule',
    data: {
        Permission: {
            Only: ['User'],
            RedirectTo: '403'
        } as PermissionGuard
    }
}
```

## Known Issues

1.) If you migrated to Keycloak version >=7.0.1, make sure to set the client's accessType to public.

## References

 - https://github.com/czetsuya/keycloak-angular-auth
 - https://github.com/czetsuya/keycloak-auth-api
 - https://www.keycloak.org/
 - https://cli.angular.io/
 - https://hub.docker.com/r/jboss/keycloak

## Notes

  - Keycloak is injected and initialized at main.ts.
  - keycloakRealm and keycloakBaseUrl must be set in src/environments/environment.ts.
  - src/assets/keycloak.json, is where we defined the keycloak client configuration.
  
*Make sure that keycloak is running before running this app on ng serve. This project is calling keycloak from port 8380, you may want to change that to 8080 if you deploy keycloak as default (src/environments/environment.ts).

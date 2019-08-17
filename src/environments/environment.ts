// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    baseUrl: 'http://localhost:4200',
    production: false,
    apiUrl: 'http://localhost:8080/keycloak-auth-api/rest',

    keycloakRealm: 'keycloak-auth',
    keycloakClient: 'auth-client',
    keycloakBaseUrl: 'http://localhost:8080/'
};
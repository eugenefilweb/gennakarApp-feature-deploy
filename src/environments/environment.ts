// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    // apiUrl: 'https://gennakar.accessgov.ph/api/v1/',
    apiUrl: 'http://localhost:8080/api/v1/',
    // apiUrl: 'http://gennakar-new.local/api/v1/',
    // apiUrl: 'http://gennakar.local/api/v1/',
    // localApi: 'http://192.168.1.194/gennakar/web/api/v1/',
    // apiUrl: 'http://192.168.1.138/gennakar/web/api/v1/',
    // mapsKey: 'AIzaSyDb-9GUL48_H3N1WkwC67F-YopzfeTswsY'
    
    MAP_BOX_TOKEN: 'pk.eyJ1IjoibW9uYWdwYWxhIiwiYSI6ImNsbHhoeXlnMTJjY3kzY3A4aTJnNzBzbXcifQ.Oxl8S96Ojp7nfJQcwxOTCw'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 * 
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

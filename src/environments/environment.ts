import { HttpHeaders, HttpParams } from '@angular/common/http';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // apiURL: 'http://192.168.0.28:8080/budget/', //Prod
  apiURL: 'http://192.168.0.15:8080/budget/', //Dev


  getHttpOptions() {
    const headers = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin' : '*',
        Authorization : 'Basic ' + btoa('user:password')
      }),
      params: new HttpParams()
    };
    return headers;
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

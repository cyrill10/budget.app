import { HttpHeaders, HttpParams } from '@angular/common/http';

export const environment = {
  production: true,

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
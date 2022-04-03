import {HttpHeaders} from '@angular/common/http';

export const environment = {
  production: true,

  getAuthorizationHeaders() {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Basic ' + btoa('user:password')
    });
  }
};

import { HttpHeaders } from '@angular/common/http';
import { Buffer } from 'buffer';

export const environment = {
  production: true,

  getAuthorizationHeaders() {
    return new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization:
        'Basic ' +
        Buffer.from(this.authUsername + ':' + this.authPassword).toString(
          'base64'
        ),
    });
  },
  getPort() {
    return null;
  },
};

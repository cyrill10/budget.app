import { HttpHeaders } from '@angular/common/http';
import { Buffer } from 'buffer';

export const environment = {
  production: true,
  authUsername: 'budget-user',
  authPassword: '83WoogdTloBM',

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
  getProtocol(): string {
    return 'https://';
  },

  getDefaultUrl(): string {
    return 'budget-server-prod-budget-server-z9ef36.mo2.mogenius.io';
  },
};

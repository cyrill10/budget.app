import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  url = 'budget-server-prod-budget-server-z9ef36.mo2.mogenius.io';
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    this._storage = await this.storage.create();
    this.getURLPromise().then((val) => (this.url = val));
  }

  public setURL(url: string) {
    if (url === null || url === undefined || url === '') {
      this.storage.remove('url');
      this.url = 'budget-server-prod-budget-server-z9ef36.mo2.mogenius.io';
    } else {
      this.storage.set('url', url);
      this.url = url;
    }
  }

  public getURL(): string {
    return this.url;
  }

  public getServicePath$(): Observable<string> {
    return this.getURL$().pipe(
      map((val) => {
        const start = 'https://';
        const port = environment.getPort();
        const path = '/budget/';
        if (port) {
          return start + val + ':' + port + path;
        }
        return start + val + path;
      })
    );
  }

  private async getURLPromise(): Promise<string> {
    let url = await this.storage.get('url').then((val) => {
      return val;
    });
    if (url === null) {
      url = 'budget-server-prod-budget-server-z9ef36.mo2.mogenius.io';
    }
    return url;
  }

  private getURL$(): Observable<string> {
    return from(
      this.storage.get('url').then((val) => {
        if (!val) {
          return 'budget-server-prod-budget-server-z9ef36.mo2.mogenius.io';
        }
        return val;
      })
    );
  }
}

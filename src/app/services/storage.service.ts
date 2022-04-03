import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  url = '192.168.0.28';
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    this._storage = await this.storage.create();
    this.getURLPromise().then(val => this.url = val);
  }

  public setURL(url: string) {
    if (url === null || url === undefined || url === '') {
      this.storage.remove('url');
      this.url = '192.168.0.28';
    } else {
      this.storage.set('url', url);
      this.url = url;
    }

  }

  public getURL(): string {
    return this.url;
  }

  public getServicePath$(): Observable<string> {
    return this.getURL$().pipe(map(val => {
      const start = 'http://'
      const port = '8085';
      const path = '/budget/'
      return start + val + ':' + port + path;
    }));
  }

  private async getURLPromise(): Promise<string> {
    let url = await this.storage.get('url').then(val => {
      return val
    });
    if (url === null) {
      url = '192.168.0.28';
    }
    return url;
  }

  private getURL$(): Observable<string> {
    return from(this.storage.get('url').then(val => {
      if (!val) {
        return '192.168.0.28'
      }
      return val;
    }));
  }
}

import {Injectable} from '@angular/core';
import {VirtualAccount} from '../element/virtualaccount';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ErrorService} from './error.service';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class VirtualAccountService {

  virtualAccounts: VirtualAccount[];

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorService,
    private storage: StorageService) {
  }

  getVirtualAccountsForAccount(accountId: number): Observable<VirtualAccount[]> {
    const accountUrl = this.storage.getServicePath() + 'virtualAccount/listForAccount';
    const httpOptions = environment.getHttpOptions();
    httpOptions.params = new HttpParams().set('realAccountId', '' + accountId);
    return this.http.get<VirtualAccount[]>(accountUrl, httpOptions).pipe(
      catchError(this.errorHandler.handleError) // then handle the error
    );
  }

  getVirtualAccounts(): Observable<VirtualAccount[]> {
    const accountUrl = this.storage.getServicePath() + 'virtualAccount/list';
    return this.http.get<VirtualAccount[]>(accountUrl, environment.getHttpOptions()).pipe(
      catchError(this.errorHandler.handleError) // then handle the error
    );
  }

  getVirtualAccount(id: string): Observable<VirtualAccount> {
    const accountUrl = this.storage.getServicePath() + 'virtualAccount/';
    const httpOptions = environment.getHttpOptions();
    httpOptions.params = new HttpParams().set('id', id);
    return this.http.get<VirtualAccount>(accountUrl, httpOptions).pipe(
      catchError(this.errorHandler.handleError) // then handle the error
    );
  }

  getVirtualAccountByName(name: string): VirtualAccount {
    let result: VirtualAccount;
    this.virtualAccounts.forEach(element => {
      if (element.name === name) {
        result = element;
      }
    });
    return result;
  }


  addVirtualAccount(account: VirtualAccount): Observable<VirtualAccount> {
    const accountUrl = this.storage.getServicePath() + 'virtualAccount/add';
    return this.http.post<VirtualAccount>(accountUrl, account, environment.getHttpOptions())
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  updateVirtualAccount(account: VirtualAccount): Observable<VirtualAccount> {
    const accountUrl = this.storage.getServicePath() + 'virtualAccount/update';
    return this.http.put<VirtualAccount>(accountUrl, account, environment.getHttpOptions())
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
}

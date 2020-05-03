import { Injectable } from '@angular/core';
import { VirtualAccount } from '../element/virtualaccount';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class VirtualAccountService {

  virtualAccounts: VirtualAccount[];

  constructor(private http: HttpClient,
              private errorHandler: ErrorService) {
  }

  getVirtualAccountsForAccount(accountId: number): Observable<VirtualAccount[]> {
    const accountUrl = environment.apiURL + 'virtualAccount/listForAccount';
    const httpOptions = environment.getHttpOptions();
    httpOptions.params = new HttpParams().set('realAccountId', '' + accountId);
    const downloadedAccounts = this.http.get<VirtualAccount[]>(accountUrl, httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return downloadedAccounts;
  }

    getVirtualAccounts(): Observable<VirtualAccount[]> {
    const accountUrl = environment.apiURL + 'virtualAccount/list';
    const downloadedAccounts = this.http.get<VirtualAccount[]>(accountUrl, environment.getHttpOptions()).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return downloadedAccounts;
  }

    getVirtualAccount(id: string): Observable<VirtualAccount> {
    const accountUrl = environment.apiURL + 'virtualAccount/';
    const httpOptions = environment.getHttpOptions();
    httpOptions.params = new HttpParams().set('id', id);
    const downloadedAccounts = this.http.get<VirtualAccount>(accountUrl, httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return downloadedAccounts;
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
    const accountUrl = environment.apiURL + 'virtualAccount/add';
    return this.http.post<VirtualAccount>(accountUrl, account, environment.getHttpOptions())
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  updateVirtualAccount(account: VirtualAccount): Observable<VirtualAccount> {
    const accountUrl = environment.apiURL + 'virtualAccount/update';
    return this.http.put<VirtualAccount>(accountUrl, account, environment.getHttpOptions())
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
}

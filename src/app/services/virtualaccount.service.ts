import { Injectable } from '@angular/core';
import { VirtualAccount } from '../element/virtualaccount';
import { LoggerService } from './logger.service';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient, HttpParams } from '@angular/common/http';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class VirtualAccountService {

  virtualAccounts: VirtualAccount[];

  constructor(private logger: LoggerService,
              private http: HttpClient,
              private errorHandler: ErrorService) {
  }

  getVirtualAccountsForAccount(accountId: number): Observable<VirtualAccount[]> {
    const accountUrl = environment.apiURL + 'virtualAccount/listForAccount';
    const httpOptions = environment.httpOptions;
    httpOptions.params = new HttpParams().set('realAccountId', '' + accountId);
    const downloadedAccounts = this.http.get<VirtualAccount[]>(accountUrl, httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return downloadedAccounts;
  }

    getVirtualAccounts(): Observable<VirtualAccount[]> {
    const accountUrl = environment.apiURL + 'virtualAccount/list';
    const downloadedAccounts = this.http.get<VirtualAccount[]>(accountUrl, environment.httpOptions).pipe(
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
    this.logger.log(account);
    return this.http.post<VirtualAccount>(accountUrl, account, environment.httpOptions)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  updateVirtualAccount(account: VirtualAccount): Observable<VirtualAccount> {
    const accountUrl = environment.apiURL + 'virtualAccount/update';
    return this.http.put<VirtualAccount>(accountUrl, account, environment.httpOptions)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
}

import { Injectable } from '@angular/core';
import { Account } from '../element/account';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorService } from './error.service';
import { AccountElement } from '../element/accountelement';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private errorHandler: ErrorService,
              private http: HttpClient) { }


  getAccounts(): Observable<AccountElement[]>{
    const accountUrl = environment.apiURL + 'realAccount/list';
    const downloadedAccounts = this.http.get<AccountElement[]>(accountUrl, environment.getHttpOptions()).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return downloadedAccounts;
  }

    getAccount(id: string): Observable<Account>{
    const accountUrl = environment.apiURL + 'realAccount/';
    const httpOptions = environment.getHttpOptions();
    httpOptions.params = new HttpParams().set('id', id);
    const downloadedAccounts = this.http.get<Account>(accountUrl, httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return downloadedAccounts;
  }

  addAccount(account: Account): Observable<Account> {
    const accountUrl = environment.apiURL + 'realAccount/add';
    return this.http.post<Account>(accountUrl, account, environment.getHttpOptions())
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

    updateAccount(account: Account): Observable<Account> {
    const accountUrl = environment.apiURL + 'realAccount/update';
    return this.http.put<Account>(accountUrl, account, environment.getHttpOptions())
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
}

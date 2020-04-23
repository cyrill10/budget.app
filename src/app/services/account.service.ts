import { Injectable } from '@angular/core';
import { Account } from '../element/account';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './logger.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accounts: Account[];

  constructor(private errorHandler: ErrorService,
              private http: HttpClient,
              private logger: LoggerService) { }


  getAccounts(): Observable<Account[]>{
    const accountUrl = environment.apiURL + 'realAccount/list';
    const downloadedAccounts = this.http.get<Account[]>(accountUrl, environment.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return downloadedAccounts;
  }

  addAccount(account: Account): Observable<Account> {
    const accountUrl = environment.apiURL + 'realAccount/add';
    return this.http.post<Account>(accountUrl, account, environment.httpOptions)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

    updateAccount(account: Account): Observable<Account> {
    const accountUrl = environment.apiURL + 'realAccount/update';
    return this.http.put<Account>(accountUrl, account, environment.httpOptions)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
}

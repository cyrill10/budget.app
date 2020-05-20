import { Injectable } from '@angular/core';
import { Account } from '../element/account';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorService } from './error.service';
import { AccountElement } from '../element/accountelement';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
	private errorHandler: ErrorService,
    private http: HttpClient,
	private storage: StorageService) { }


  getAccounts(): Observable<AccountElement[]>{
    const accountUrl = this.storage.getServicePath() + 'realAccount/list';
    const downloadedAccounts = this.http.get<AccountElement[]>(accountUrl, environment.getHttpOptions()).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return downloadedAccounts;
  }

    getAccount(id: string): Observable<Account>{
    const accountUrl = this.storage.getServicePath() + 'realAccount/';
    const httpOptions = environment.getHttpOptions();
    httpOptions.params = new HttpParams().set('id', id);
    const downloadedAccounts = this.http.get<Account>(accountUrl, httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return downloadedAccounts;
  }

  addAccount(account: Account): Observable<Account> {
    const accountUrl = this.storage.getServicePath() + 'realAccount/add';
    return this.http.post<Account>(accountUrl, account, environment.getHttpOptions())
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

    updateAccount(account: Account): Observable<Account> {
    const accountUrl = this.storage.getServicePath() + 'realAccount/update';
    return this.http.put<Account>(accountUrl, account, environment.getHttpOptions())
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
}

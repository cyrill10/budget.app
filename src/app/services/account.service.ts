import { Injectable } from '@angular/core';
import { Account } from '../element/account';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { AccountElement } from '../element/accountelement';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private errorHandler: ErrorService, private http: HttpClient) {}

  getAccounts(): Observable<AccountElement[]> {
    return this.http.get<AccountElement[]>('realAccount/list').pipe(
      catchError(this.errorHandler.handleError) // then handle the error
    );
  }

  getAccount(id: string): Observable<Account> {
    return this.http.get<Account>('realAccount/', { params: { id } }).pipe(
      catchError(this.errorHandler.handleError) // then handle the error
    );
  }

  addAccount(account: Account): Observable<Account> {
    return this.http
      .post<Account>('realAccount/add', account)
      .pipe(catchError(this.errorHandler.handleError));
  }

  updateAccount(account: Account): Observable<Account> {
    return this.http
      .put<Account>('realAccount/update', account)
      .pipe(catchError(this.errorHandler.handleError));
  }
}

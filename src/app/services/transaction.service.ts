import { Injectable } from '@angular/core';
import { Transaction } from '../element/transaction';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ErrorService } from './error.service';
import { LoggerService } from './logger.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { VirtualAccount } from '../element/virtualaccount';
import { TransactionElement } from '../element/transactionelement';
import { Account } from '../element/account';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  

  constructor(
    private errorHandler: ErrorService,
    private http: HttpClient,
    private logger: LoggerService) { }


  getTransactions(date: Date): Observable<Transaction[]> {
    const url = environment.apiURL + 'transaction/list';
    const httpOptions = environment.getHttpOptions();
    httpOptions.params = new HttpParams().set('date', '' + date.getTime());
    const observer = this.http.get<Transaction[]>(url, httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return observer;
  }

  getTransaction(id: number): Observable<Transaction> {
    const url = environment.apiURL + 'transaction/';
    const httpOptions = environment.getHttpOptions();
    httpOptions.params = new HttpParams().set('id', '' + id);
    const observer = this.http.get<Transaction>(url, httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return observer;
  }

  getTransactionsForVirtualAccount(virtualAccount: VirtualAccount, date: Date): Observable<TransactionElement[]> {
    if (virtualAccount !== undefined) {
      const url = environment.apiURL + 'transaction/listByMonthAndVirtualAccount';
      const httpOptions = environment.getHttpOptions();
      httpOptions.params = new HttpParams()
        .set('date', '' + date.getTime())
        .set('accountId', '' + virtualAccount.id);
      const observer = this.http.get<TransactionElement[]>(url, httpOptions).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.errorHandler.handleError) // then handle the error
      );
      return observer;
    }
    return new Observable();
  }

  getTransactionsForRealAccount(account: Account, date: Date): Observable<TransactionElement[]> {
    if (account !== undefined) {
      const url = environment.apiURL + 'transaction/listByMonthAndRealAccount';
      const httpOptions = environment.getHttpOptions();
      httpOptions.params = new HttpParams()
        .set('date', '' + date.getTime())
        .set('accountId', '' + account.id);
      const observer = this.http.get<TransactionElement[]>(url, httpOptions).pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.errorHandler.handleError) // then handle the error
      );
      return observer;
    }
    return new Observable();
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    transaction.date.setHours(12);
    const url = environment.apiURL + 'transaction/add';
    return this.http.post<Transaction>(url, transaction, environment.getHttpOptions())
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    const url = environment.apiURL + 'transaction/update';
    return this.http.put<Transaction>(url, transaction, environment.getHttpOptions())
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  deleteTransaction(transaction: Transaction): Observable<any> {
    const url = environment.apiURL + 'transaction/delete';
    const httpOptions = environment.getHttpOptions();
    httpOptions.params = new HttpParams().set('transactionId', '' + transaction.id);
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  createDublicatesTillEndOfTheYear(transaction: Transaction): Observable<any> {
    const url = environment.apiURL + 'transaction/dublicate';
    return this.http.post(url, transaction, environment.getHttpOptions())
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
}

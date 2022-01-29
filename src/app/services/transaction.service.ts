import {Injectable} from '@angular/core';
import {Transaction} from '../element/transaction';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ErrorService} from './error.service';
import {LoggerService} from './logger.service';
import {StorageService} from './storage.service';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {catchError} from 'rxjs/operators';
import {VirtualAccount} from '../element/virtualaccount';
import {TransactionElement} from '../element/transactionelement';
import {Account} from '../element/account';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {


  constructor(
    private errorHandler: ErrorService,
    private http: HttpClient,
    private logger: LoggerService,
	private storage: StorageService) { }


  getTransactions(date: Date): Observable<Transaction[]> {
    const url = this.storage.getServicePath() + 'transaction/list';
    const httpOptions = environment.getHttpOptions();
    httpOptions.params = new HttpParams().set('date', '' + date.getTime());
    return this.http.get<Transaction[]>(url, httpOptions).pipe(
      catchError(this.errorHandler.handleError) // then handle the error
    );
  }

  getTransaction(id: number): Observable<Transaction> {
    const url = this.storage.getServicePath() + 'transaction/';
    const httpOptions = environment.getHttpOptions();
    httpOptions.params = new HttpParams().set('id', '' + id);
    return this.http.get<Transaction>(url, httpOptions).pipe(
      catchError(this.errorHandler.handleError) // then handle the error
    );
  }

  getTransactionsForVirtualAccount(virtualAccount: VirtualAccount, date: Date): Observable<TransactionElement[]> {
    if (virtualAccount !== undefined) {
      const url = this.storage.getServicePath() + 'transaction/listByMonthAndVirtualAccount';
      const httpOptions = environment.getHttpOptions();
      httpOptions.params = new HttpParams()
        .set('date', '' + date.getTime())
        .set('accountId', '' + virtualAccount.id);
      return this.http.get<TransactionElement[]>(url, httpOptions).pipe(
        catchError(this.errorHandler.handleError) // then handle the error
      );
    }
    return new Observable();
  }

  getTransactionsForRealAccount(account: Account, date: Date): Observable<TransactionElement[]> {
    if (account !== undefined) {
      const url = this.storage.getServicePath() + 'transaction/listByMonthAndRealAccount';
      const httpOptions = environment.getHttpOptions();
      httpOptions.params = new HttpParams()
        .set('date', '' + date.getTime())
        .set('accountId', '' + account.id);
      return this.http.get<TransactionElement[]>(url, httpOptions).pipe(
        catchError(this.errorHandler.handleError) // then handle the error
      );
    }
    return new Observable();
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    transaction.date.setHours(12);
    const url = this.storage.getServicePath() + 'transaction/add';
    return this.http.post<Transaction>(url, transaction, environment.getHttpOptions())
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    const url = this.storage.getServicePath() + 'transaction/update';
    return this.http.put<Transaction>(url, transaction, environment.getHttpOptions())
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  deleteTransaction(transaction: Transaction): Observable<any> {
    const url = this.storage.getServicePath() + 'transaction/delete';
    const httpOptions = environment.getHttpOptions();
    httpOptions.params = new HttpParams().set('transactionId', '' + transaction.id);
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }

  createDublicatesTillEndOfTheYear(transaction: Transaction): Observable<any> {
    const url = this.storage.getServicePath() + 'transaction/dublicate';
    return this.http.post(url, transaction, environment.getHttpOptions())
      .pipe(
        catchError(this.errorHandler.handleError)
      );
  }
}

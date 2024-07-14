import { Injectable } from '@angular/core';
import { Transaction } from '../element/transaction';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { VirtualAccount } from '../element/virtualaccount';
import { TransactionElement } from '../element/transactionelement';
import { Account } from '../element/account';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(
    private errorHandler: ErrorService,
    private http: HttpClient,
  ) {}

  getTransactions(date: Date): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>('transaction/list', {
        params: { date: date.getTime() },
      })
      .pipe(
        catchError(this.errorHandler.handleError), // then handle the error
      );
  }

  getTransaction(id: string): Observable<Transaction> {
    return this.http.get<Transaction>('transaction/', { params: { id } }).pipe(
      catchError(this.errorHandler.handleError), // then handle the error
    );
  }

  getTransactionsForVirtualAccount(
    virtualAccount: VirtualAccount,
    date: Date,
  ): Observable<TransactionElement[]> {
    if (virtualAccount !== undefined) {
      return this.http
        .get<TransactionElement[]>('transaction/listByMonthAndVirtualAccount', {
          params: {
            date: date.getTime(),
            accountId: '' + virtualAccount.id,
          },
        })
        .pipe(
          catchError(this.errorHandler.handleError), // then handle the error
        );
    }
    return of(null);
  }

  getTransactionsForRealAccount(
    account: Account,
    date: Date,
  ): Observable<TransactionElement[]> {
    if (account !== undefined) {
      return this.http
        .get<TransactionElement[]>('transaction/listByMonthAndRealAccount', {
          params: {
            date: date.getTime(),
            accountId: '' + account.id,
          },
        })
        .pipe(
          catchError(this.errorHandler.handleError), // then handle the error
        );
    }
    return of(null);
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    transaction.date.setHours(12);
    return this.http
      .post<Transaction>('transaction/add', transaction)
      .pipe(catchError(this.errorHandler.handleError));
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http
      .put<Transaction>('transaction/update', transaction)
      .pipe(catchError(this.errorHandler.handleError));
  }

  deleteTransaction(transaction: Transaction): Observable<any> {
    return this.http
      .delete('transaction/delete', {
        params: { transactionId: transaction.id },
      })
      .pipe(catchError(this.errorHandler.handleError));
  }

  createDublicatesTillEndOfTheYear(transaction: Transaction): Observable<any> {
    return this.http
      .post('transaction/dublicate', transaction)
      .pipe(catchError(this.errorHandler.handleError));
  }
}

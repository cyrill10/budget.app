import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReoccurringTransaction } from '../element/reoccurringtransaction';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class ReoccurringTransactionService {

  constructor(private errorHandler: ErrorService, private http: HttpClient) {}

  getReoccuringTransactions(): Observable<ReoccurringTransaction[]> {
    return this.http.get<ReoccurringTransaction[]>('reoccurringTransaction/list').pipe(
      catchError(this.errorHandler.handleError) // then handle the error
    );
  }

  addReoccurringTransaction(reoccurringTransaction: ReoccurringTransaction): Observable<ReoccurringTransaction> {
    return this.http
      .post<ReoccurringTransaction>('reoccurringTransaction/add', reoccurringTransaction)
      .pipe(catchError(this.errorHandler.handleError));
  }

  updateReoccurringTransaction(reoccurringTransaction: ReoccurringTransaction): Observable<ReoccurringTransaction> {
    return this.http
      .put<ReoccurringTransaction>('reoccurringTransaction/update', reoccurringTransaction)
      .pipe(catchError(this.errorHandler.handleError));
  }
}

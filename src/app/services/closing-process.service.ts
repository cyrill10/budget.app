import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  ProcessData,
  ScannedTransaction,
  TransferDetail,
} from '../state/closing-process/closing-process.reducers';

export interface SaveTransactionDto {
  transactionIds: string[];
  creditedAccountId: string;
  debitedAccountId: string;
  throughAccountId: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClosingProcessService {
  constructor(private errorHandler: ErrorService, private http: HttpClient) {}

  uploadPdf(file: File, date: Date): Observable<ScannedTransaction[]> {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('year', date.getFullYear() + '');
    fd.append('month', date.getMonth() + '');
    return this.http.post<ScannedTransaction[]>('closingProcess', fd, {
      headers: { 'Content-Type': undefined },
    });
  }

  loadProcessData(date: Date): Observable<ProcessData> {
    const params = new HttpParams()
      .set('year', date.getFullYear())
      .set('month', date.getMonth());
    return this.http.get<ProcessData>('closingProcess', { params }).pipe(
      catchError(this.errorHandler.handleError) // then handle the error
    );
  }

  loadProcessTransactions(date: Date): Observable<ScannedTransaction[]> {
    const params = new HttpParams()
      .set('year', date.getFullYear())
      .set('month', date.getMonth());
    return this.http
      .get<ScannedTransaction[]>('closingProcess/transactions', { params })
      .pipe(
        catchError(this.errorHandler.handleError) // then handle the error
      );
  }

  saveProcessTransactions(
    saveTransactionDto: SaveTransactionDto
  ): Observable<void> {
    return this.http
      .post<void>('closingProcess/transactions', saveTransactionDto)
      .pipe(
        catchError(this.errorHandler.handleError) // then handle the error
      );
  }

  closeFileUpload(date: Date): Observable<ProcessData> {
    const params = new HttpParams()
      .set('year', date.getFullYear())
      .set('month', date.getMonth());
    return this.http
      .post<ProcessData>('closingProcess/closeFileUpload', null, { params })
      .pipe(
        catchError(this.errorHandler.handleError) // then handle the error
      );
  }

  finishTransfer(date: Date): Observable<ProcessData> {
    const params = new HttpParams()
      .set('year', date.getFullYear())
      .set('month', date.getMonth());
    return this.http
      .post<ProcessData>('closingProcess/transfer/close', null, { params })
      .pipe(
        catchError(this.errorHandler.handleError) // then handle the error
      );
  }

  loadTransferDetails(date: Date): Observable<TransferDetail[]> {
    const params = new HttpParams()
      .set('year', date.getFullYear())
      .set('month', date.getMonth());
    return this.http
      .get<TransferDetail[]>('closingProcess/transfer/details', { params })
      .pipe(
        catchError(this.errorHandler.handleError) // then handle the error
      );
  }
}

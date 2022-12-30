import { Injectable } from '@angular/core';
import { PaymentType } from '../element/paymenttype';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PaymentTypeService {
  constructor(private errorHandler: ErrorService, private http: HttpClient) {}

  getPaymentTypes(): Observable<PaymentType[]> {
    return this.http.get<PaymentType[]>('transaction/type/list').pipe(
      catchError(this.errorHandler.handleError) // then handle the error
    );
  }
}

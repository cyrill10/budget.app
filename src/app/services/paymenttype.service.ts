import {Injectable} from '@angular/core';
import {PaymentType} from '../element/paymenttype';
import {HttpClient} from '@angular/common/http';
import {ErrorService} from './error.service';
import {StorageService} from './storage.service';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {

  constructor(
    private errorHandler: ErrorService,
    private http: HttpClient,
    private storage: StorageService) {
  }

  getPaymentTypes(): Observable<PaymentType[]> {
    const accountUrl = this.storage.getServicePath() + 'transaction/type/list';
    return this.http.get<PaymentType[]>(accountUrl, environment.getHttpOptions()).pipe(
      catchError(this.errorHandler.handleError) // then handle the error
    );
  }
}

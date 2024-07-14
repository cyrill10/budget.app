import { Injectable } from '@angular/core';
import { AccountType } from '../element/accounttype';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorService } from './error.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountTypeService {
  constructor(
    private errorHandler: ErrorService,
    private http: HttpClient,
  ) {}

  getAccountTypes(): Observable<AccountType[]> {
    return this.http.get<AccountType[]>('realAccount/type/list').pipe(
      catchError(this.errorHandler.handleError), // then handle the error
    );
  }
}

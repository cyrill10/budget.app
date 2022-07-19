import { Injectable } from '@angular/core';
import { VirtualAccount } from '../element/virtualaccount';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class VirtualAccountService {
  virtualAccounts: VirtualAccount[];

  constructor(private http: HttpClient, private errorHandler: ErrorService) {}

  getVirtualAccounts(): Observable<VirtualAccount[]> {
    return this.http.get<VirtualAccount[]>('virtualAccount/list').pipe(
      catchError(this.errorHandler.handleError) // then handle the error
    );
  }

  getVirtualAccount(id: string): Observable<VirtualAccount> {
    return this.http
      .get<VirtualAccount>('virtualAccount/', { params: { id } })
      .pipe(
        catchError(this.errorHandler.handleError) // then handle the error
      );
  }

  getVirtualAccountByName(name: string): VirtualAccount {
    return this.virtualAccounts.find((element) => element.name === name);
  }

  addVirtualAccount(account: VirtualAccount): Observable<VirtualAccount> {
    return this.http
      .post<VirtualAccount>('virtualAccount/add', account)
      .pipe(catchError(this.errorHandler.handleError));
  }

  updateVirtualAccount(account: VirtualAccount): Observable<VirtualAccount> {
    return this.http
      .put<VirtualAccount>('virtualAccount/update', account)
      .pipe(catchError(this.errorHandler.handleError));
  }
}

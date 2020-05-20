import { Injectable } from '@angular/core';
import { AccountType } from '../element/accounttype';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ErrorService } from './error.service';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountTypeService {

  constructor(
	private errorHandler: ErrorService,
    private http: HttpClient,
	private storage: StorageService) { }

  getAccountTypes(): Observable<AccountType[]> {
    const accountUrl = this.storage.getServicePath() + 'realAccount/type/list';
    const downloadedAccountTypes = this.http.get<AccountType[]>(accountUrl, environment.getHttpOptions()).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return downloadedAccountTypes;
  }
}

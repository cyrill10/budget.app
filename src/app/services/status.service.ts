import { Injectable } from '@angular/core';
import { Status } from '../element/status';
import { ErrorService } from './error.service';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

 constructor(
	private errorHandler: ErrorService,
    private http: HttpClient,
	private storage: StorageService) { }

  getStatuses(): Observable<Status[]> {
    const accountUrl = this.storage.getServicePath() + 'transaction/status/list';
    const downloadedAccountStatuses = this.http.get<Status[]>(accountUrl, environment.getHttpOptions()).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return downloadedAccountStatuses;
  }
}

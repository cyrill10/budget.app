import { Injectable } from '@angular/core';
import { Status } from '../element/status';
import { ErrorService } from './error.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(
    private errorHandler: ErrorService,
    private http: HttpClient,
  ) {}

  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>('transaction/status/list').pipe(
      catchError(this.errorHandler.handleError), // then handle the error
    );
  }
}

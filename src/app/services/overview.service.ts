import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OverviewElement } from '../element/overviewelement';
import { ErrorService } from './error.service';
import { LoggerService } from './logger.service';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  constructor(
	private errorHandler: ErrorService,
    private http: HttpClient,
    private logger: LoggerService,
	private storage: StorageService) { }


  getOverview(date: Date): Observable<OverviewElement[]>{
    const url = this.storage.getServicePath() + 'overview/list';
    const httpOptions = environment.getHttpOptions();
    httpOptions.params = new HttpParams().set('dateLong', '' + date.getTime());
    const observer = this.http.get<OverviewElement[]>(url, httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return observer;
  }

}

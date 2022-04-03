import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OverviewElement} from '../element/overviewelement';
import {ErrorService} from './error.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {

  constructor(
    private errorHandler: ErrorService,
    private http: HttpClient) {
  }


  getOverview(date: Date): Observable<OverviewElement[]> {
    return this.http.get<OverviewElement[]>(
      'overview/list', {params: {dateLong: date.getTime()}}).pipe(
      catchError(this.errorHandler.handleError) // then handle the error
    );
  }

}

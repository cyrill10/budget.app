import {Injectable} from '@angular/core';
import {Indication} from '../element/indication';
import {ErrorService} from './error.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IndicationService {

  constructor(
    private errorHandler: ErrorService,
    private http: HttpClient) {
  }

  getIndications(): Observable<Indication[]> {
    return this.http.get<Indication[]>('transaction/indication/list').pipe(
      catchError(this.errorHandler.handleError) // then handle the error
    );
  }
}

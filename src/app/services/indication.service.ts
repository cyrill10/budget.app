import { Injectable } from '@angular/core';
import { Indication } from '../element/indication';
import { ErrorService } from './error.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IndicationService {

 constructor(private errorHandler: ErrorService,
             private http: HttpClient) { }

  getIndications(): Observable<Indication[]> {
    const accountUrl = environment.apiURL + 'transaction/indication/list';
    const downloadedAccountIndications = this.http.get<Indication[]>(accountUrl, environment.getHttpOptions()).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return downloadedAccountIndications;
  }
}

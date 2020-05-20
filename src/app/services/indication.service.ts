import { Injectable } from '@angular/core';
import { Indication } from '../element/indication';
import { ErrorService } from './error.service';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IndicationService {

 constructor(
	private errorHandler: ErrorService,
    private http: HttpClient,
	private storage: StorageService) { }

  getIndications(): Observable<Indication[]> {
    const accountUrl = this.storage.getServicePath() + 'transaction/indication/list';
    const downloadedAccountIndications = this.http.get<Indication[]>(accountUrl, environment.getHttpOptions()).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return downloadedAccountIndications;
  }
}

import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Insights, InsightsRequest, InsightType } from '../element/insights';

export
@Injectable({
  providedIn: 'root',
})
class InsightsService {
  constructor(
    private errorHandler: ErrorService,
    private http: HttpClient,
  ) {}

  getInsights(
    type: InsightType,
    years?: number[],
    months?: number[],
    accountIds?: string[],
  ): Observable<Insights> {
    const body: InsightsRequest = {
      insightType: type,
      years,
      months: months.map((m) => m + 1),
      accountIds,
    };
    return this.http.post<Insights>('insights/', body).pipe(
      catchError(this.errorHandler.handleError), // then handle the error
    );
  }
}

import { Injectable } from '@angular/core';
import { Month } from '../date/month';
import { ErrorService } from './error.service';
import { Observable } from 'rxjs';
import { AccountType } from '../element/accounttype';
import { environment } from 'src/environments/environment';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DateService {


  constructor(private errorHandler: ErrorService,
              private http: HttpClient) { }

  getMonths(): Observable<Month[]> {
    const accountUrl = environment.apiURL + 'realAccount/type/list';
    const downloadedAccountTypes = this.http.get<AccountType[]>(accountUrl, environment.httpOptions).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return downloadedAccountTypes;
  }

  getMonths() {
    const months = [new Month('January',
    'Jan', 'February', '01.01', '31.01', false, 0),
    new Month('February', 'Feb', 'March', '01.02', '29.02', false, 1),
    new Month('March',
      'Mar',
      'April',
      '01.03',
      '31.03',
      false,
      2),
    new Month('April',
      'Apr',
      'May',
      '01.04',
      '30.04',
      false,
      3),
    new Month('May',
      'May',
      'June',
      '01.05',
      '31.05',
      true,
      4),
    new Month('June',
      'Jun',
      'July',
      '01.06',
      '30.06',
      false,
      5),
    new Month('July',
      'Jul',
      'August',
      '01.07',
      '31.07',
      false,
      6),
    new Month('August',
      'Aug',
      'September',
      '01.08',
      '31.08',
      false,
      7),
    new Month('September',
      'Sep',
      'October',
      '01.09',
      '30.09',
      false,
      8),
    new Month('October',
      'Oct',
      'November',
      '01.10',
      '31.10',
      false,
      9),
    new Month('November',
      'Nov',
      'February',
      '01.11',
      '30.11',
      false,
      10),
    new Month('December', 'Dec', 'January', '01.12', '31.12', false, 11)];

    return months;
  }

    getMonthsById(idString: string): Month {
    let id: number;
    if (!idString) {
      id = 0;
    }else {
      id = parseInt(idString, 10);
    }
    const months = this.getMonths();
    let result: Month;
    months.forEach(element => {
      if (element.id === id) {
        result = element;
      }
    });
    return result;
  }
}

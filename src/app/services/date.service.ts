import { Injectable } from '@angular/core';
import { ErrorService } from './error.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { retry, catchError, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Month } from '../date/month';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  months: Month[];


  constructor(
	private errorHandler: ErrorService,
	private http: HttpClient,
	private storage: StorageService) {
   this.months = [
      new Month('January',
        'Jan',
        'February',
        '01.01',
        '31.01',
        false,
        0),
    new Month('February',
      'Feb',
      'March',
      '01.02',
      '29.02',
      false,
      1),
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
    new Month('December',
      'Dec',
      'January',
      '01.12',
      '31.12',
      false,
      11)];

  }

  getMonths(): Observable<Date[]> {
    const url = this.storage.getServicePath() + 'date/month/list';
    const downloadedMonths = this.http.get<Date[]>(url, environment.getHttpOptions()).pipe(
      retry(3), // retry a failed request up to 3 times
      // tslint:disable-next-line: no-shadowed-variable
      map((dates: any[]) => dates.map((d) => new Date(d))),
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return downloadedMonths;
  }

    getCurrent(): Observable<Date> {
    const url = this.storage.getServicePath() + 'date/current';
    const downloadedCurrtant = this.http.get<Date>(url, environment.getHttpOptions()).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.errorHandler.handleError) // then handle the error
    );
    return downloadedCurrtant;
  }

  getSelectedMonth(date: Date): Month {
    let month: Month;
    this.months.forEach(element => {
      if (element.id === date.getMonth()) {
        month = element;
      }
    });
    return month;
  }

    getMonthShortString(date: Date): string {
      const month = this.getSelectedMonth(date);
      let result = month.short;
      const now = new Date(Date.now());
      if (date.getFullYear() !== now.getFullYear()) {
        result += ' ' + date.getFullYear().toString().substr(-2);
      }
      return result;
  }
}

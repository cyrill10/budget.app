import { Injectable } from '@angular/core';
import { Month } from '../date/month';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getMonths() {
    const months = [new Month('January',
    'Jan', 'February', '01.01', '31.01', false, -4),
    new Month('February', 'Feb', 'February', '01.02', '29.02', false, -3),
    new Month('March',
      'Mar',
      'February',
      '01.03',
      '31.03',
      false,
      -2),
    new Month('April',
      'Apr',
      'February',
      '01.04',
      '30.04',
      false,
      -1),
    new Month('May',
      'may',
      'February',
      '01.05',
      '31.05',
      true,
      0),
    new Month('June',
      'Jun',
      'February',
      '01.06',
      '30.06',
      false,
      1),
    new Month('July',
      'Jul',
      'February',
      '01.07',
      '31.07',
      false,
      2),
    new Month('August',
      'Aug',
      'February',
      '01.08',
      '31.08',
      false,
      3),
    new Month('September',
      'Sep',
      'February',
      '01.09',
      '30.09',
      false,
      4),
    new Month('October',
      'Oct',
      'February',
      '01.10',
      '31.10',
      false,
      5),
    new Month('November',
      'Nov',
      'February',
      '01.11',
      '30.11',
      false,
      6),
    new Month('December', 'Dec', 'February', '01.12', '31.12', false, 7)];

    return months;
  }
}

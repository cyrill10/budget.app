import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  constructor() {}

  log(msg: any, className: string) {
    console.log(className + ': ' + msg);
  }
  error(msg: any, className: string) {
    console.error(className + ': ' + msg);
  }
  warn(msg: any, className: string) {
    console.warn(className + ': ' + msg);
  }
}

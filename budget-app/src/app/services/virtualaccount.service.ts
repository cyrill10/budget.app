import { Injectable } from '@angular/core';
import { VirtualAccount } from '../element/virtualaccount';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class VirtualAccountService {

  virtualAccounts: VirtualAccount[];

  constructor(private logger: LoggerService) {
    this.virtualAccounts = [{
      name: 'Cyrill Main',
      details: 'Main Cyrill',
      may: 1000,
      june: 2000,
      projection: 10000
    },
    {
      name: 'Army Money',
      details: 'Main Cyrill',
      may: 1700,
      june: 1700,
      projection: 0
    },
    {
      name: 'Health',
      details: 'Savings Lyka',
      may: 220,
      june: 320,
      projection: 800
    },
    {
      name: 'Travel',
      details: 'Savings Lyka',
      may: 4000,
      june: 6000,
      projection: 14000
    }];
  }

    getVirtualAccounts(): VirtualAccount[] {
    return this.virtualAccounts;
  }

  getVirtualAccountByName(name: string): VirtualAccount {
    let result: VirtualAccount;
    this.virtualAccounts.forEach(element => {
      if (element.name === name) {
        result = element;
      }
    });
    return result;
  }
}

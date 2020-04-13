import { Injectable } from '@angular/core';
import { Account } from '../element/account';
import { VirtualAccountService } from './virtualaccount.service';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accounts: Account[];

  constructor(private virtualAccountService: VirtualAccountService,
              private logger: LoggerService) {
    this.accounts = [{
    name: 'Main Account',
    type: 'Debit',
    virtualAccounts: [this.virtualAccountService.getVirtualAccountByName('Cyrill Main'),
                      this.virtualAccountService.getVirtualAccountByName('Army Money')]
  },
  {
    name: 'Savings Lyka',
    type: 'Debit',
    virtualAccounts: [this.virtualAccountService.getVirtualAccountByName('Health'),
                      this.virtualAccountService.getVirtualAccountByName('Travel')]
  }];
}

  getAccounts() {
    this.logger.log(this.accounts);
    return this.accounts;
  }
}

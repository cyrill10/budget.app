import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import {FormControl} from '@angular/forms';
import { Month } from 'src/app/date/month';
import { AccountService } from 'src/app/services/account.service';
import { LoggerService } from 'src/app/services/logger.service';
import { VirtualAccount } from 'src/app/element/virtualaccount';
import { VirtualAccountService } from 'src/app/services/virtualaccount.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  month: Month;
  months = this.getMonths();
  selected = new FormControl(0);
  accounts: Observable<VirtualAccount[]>;
  displayedColumns: string[] = ['name', 'detail', 'thisMonth', 'nextMonth', 'projection'];
  opened: boolean;

  getMonths() {
    return this.dateService.getMonths();
  }

  selectMonth(event: any) {
    this.selected.setValue(event);
    this.month = this.dateService.getMonthsById(this.selected.value);
  }

  getAccounts(): Observable<VirtualAccount[]> {
    let virtualAccounts: Observable<VirtualAccount[]>;
    this.accountService.getAccounts().subscribe(rAccount => {
      virtualAccounts = this.virtualAccountService.getVirtualAccountsForAccount(rAccount[1].id);
    });
    return virtualAccounts;
  }

  constructor(
    private dateService: DateService,
    private accountService: AccountService,
    private virtualAccountService: VirtualAccountService,
    private logger: LoggerService) { }

  ngOnInit(){
    this.logger.log('Init overview.component');
    const monthInt = new Date(Date.now()).getMonth();
    this.selected = new FormControl(monthInt);
    this.month = this.dateService.getMonthsById('' + monthInt);
    this.accounts = this.getAccounts();
  }

}

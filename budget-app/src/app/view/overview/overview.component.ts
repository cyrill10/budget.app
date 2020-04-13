import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import { ActivatedRoute } from '@angular/router';
import { Month } from 'src/app/date/month';
import { AccountService } from 'src/app/services/account.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent implements OnInit {
  title = 'budget-app';
  month: Month;


  getMonths() {
    return this.dateService.getMonths();
  }

  getMonthsById(idString: string): Month {
    let id: number;
    if (!idString) {
      id = 0;
    }else {
      id = parseInt(idString, 10);
    }
    const months = this.dateService.getMonths();
    let result: Month;
    months.forEach(element => {
      if (element.id === id) {
        result = element;
      }
    });
    return result;
  }

  getAccounts() {
    return this.accountServie.getAccounts();
  }

  constructor(
    private dateService: DateService,
    private route: ActivatedRoute,
    private accountServie: AccountService,
    private logger: LoggerService) { }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
    this.month = this.getMonthsById(params.get('monthId'));
  });
  }

}

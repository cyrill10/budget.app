import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import { ActivatedRoute } from '@angular/router';
import { Month } from 'src/app/date/month';
import { TransactionService } from 'src/app/services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

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

  getTransactions() {
    return this.transactionService.getTransactions();
  }

  constructor(
    private dateService: DateService,
    private route: ActivatedRoute,
    private transactionService: TransactionService) { }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
    this.month = this.getMonthsById(params.get('monthId'));
  });
  }

}

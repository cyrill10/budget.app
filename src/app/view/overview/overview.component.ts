import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import {FormControl} from '@angular/forms';
import { Month } from 'src/app/date/month';
import { LoggerService } from 'src/app/services/logger.service';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OverviewService } from 'src/app/services/overview.service';
import { OverviewElement } from 'src/app/element/overviewelement';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  month = new Date(Date.now());
  months: Date[];
  selected = new FormControl(0);
  private readonly refreshToken$ = new BehaviorSubject(undefined);
  accounts = this.refreshToken$.pipe(
    switchMap(() => this.overviewService.getOverview(this.month))
  );
  displayedColumns: string[] = ['name', 'nextMonth', 'projection'];
  opened: boolean;

  constructor(
    private dateService: DateService,
    private logger: LoggerService,
    private overviewService: OverviewService,
    private route: Router) {
    this.dateService.getMonths().subscribe(data => this.months = data);
    this.dateService.getCurrent().subscribe(d => this.selected = new FormControl(d));
  }

    ngOnInit(){
    this.logger.log('Init', 'OverviewComponent');
  }

  selectAccount(element: OverviewElement) {
     if (element.realAccount) {
        this.route.navigate(['/realAccount/transactions', {id: element.id, selectedMonth: this.selected.value}]);
     }else {
        this.route.navigate(['/virtualAccount/transactions', {id: element.id, selectedMonth: this.selected.value}]);
     }
}

  selectMonth(event: Event) {
    this.selected.setValue(event);
    this.month = this.months[this.selected.value];
    this.refreshToken$.next(undefined);
  }

    getShortName(date: Date): string {
    return this.dateService.getMonthShortString(date);
  }

    getSelectedMonth(date: Date): Month {
       return this.dateService.getSelectedMonth(date);
    }

    isInTheFuture(): boolean {
      const firstOfNextMonth = new Date(Date.now());
      firstOfNextMonth.setDate(1);
      firstOfNextMonth.setMonth(firstOfNextMonth.getMonth() + 1);
      firstOfNextMonth.setHours(0);
      return this.month >= firstOfNextMonth;
    }
}

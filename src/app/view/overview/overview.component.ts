import {Component, OnInit} from '@angular/core';
import {DateService} from '../../services/date.service';
import {Month} from 'src/app/date/month';
import {LoggerService} from 'src/app/services/logger.service';
import {Observable, combineLatest, of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {OverviewService} from 'src/app/services/overview.service';
import {OverviewElement} from 'src/app/element/overviewelement';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  month = new Date(Date.now());
  months$: Observable<Date[]>;
  currentMonth$: Observable<number>;
  selected$: Observable<number>;
  accounts$: Observable<OverviewElement[]>;
  displayedColumns: string[] = ['name', 'balance', 'projection'];
  opened: boolean;

  constructor(
    private dateService: DateService,
    private logger: LoggerService,
    private overviewService: OverviewService,
    private route: Router) {
  }

  ngOnInit() {
    this.logger.log('Init', 'OverviewComponent');
    this.months$ = this.dateService.getMonths();
    this.currentMonth$ = this.dateService.getCurrent();

    this.selected$ = this.currentMonth$.pipe(
      map((date) => {
        return date;
      })
    );

    this.accounts$ = combineLatest(([this.selected$, this.months$])).pipe(
      switchMap(([selected, months]) => {
        console.log(selected);
        return this.overviewService.getOverview(months[selected]);
      })
    );
  }

  selectAccount(element: OverviewElement) {
    // if (element.realAccount) {
    //   this.route.navigate(['/realAccount/transactions', {id: element.id, selectedMonth: this.selected.value}]);
    // } else {
    //   this.route.navigate(['/virtualAccount/transactions', {id: element.id, selectedMonth: this.selected.value}]);
    // }
  }

  selectMonth(event: number) {
    this.selected$ = of(event);
  }

  getShortName(date: Date): string {
    return this.dateService.getMonthShortString(date);
  }

  getSelectedMonth(date: Date): Month {
    return this.dateService.getSelectedMonth(date);
  }

  isInTheFuture(): boolean {
    return this.dateService.isInTheFuture(this.month);
  }
}

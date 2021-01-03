import {Component, OnInit} from '@angular/core';
import {DateService} from '../../services/date.service';
import {Month} from 'src/app/date/month';
import {LoggerService} from 'src/app/services/logger.service';
import {Observable, combineLatest} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {OverviewService} from 'src/app/services/overview.service';
import {OverviewElement} from 'src/app/element/overviewelement';
import {select, Store} from '@ngrx/store';
import {selectMonth} from './overview.actions';
import {selectSelectedMonth} from './overview.selectors';

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
  private selectedMonth: number

  constructor(
    private dateService: DateService,
    private logger: LoggerService,
    private overviewService: OverviewService,
    private route: Router,
    private store: Store) {
  }

  ngOnInit() {
    this.logger.log('Init', 'OverviewComponent');
    this.months$ = this.dateService.getMonths();
    this.currentMonth$ = this.dateService.getCurrent().pipe(
      tap(date => {
        this.store.dispatch(selectMonth({month:date}))
        })
    );

    this.selected$ = this.store.pipe(select(selectSelectedMonth))

    this.accounts$ = combineLatest(([this.selected$, this.months$])).pipe(
      switchMap(([selected, months]) => {
        this.selectedMonth = selected;
        return this.overviewService.getOverview(months[selected]);
      })
    );
  }

  selectAccount(element: OverviewElement) {
    // TODO selectedMonth should be initially set in store and not used for navigation
    if (element.realAccount) {
      this.route.navigate(['/realAccount/transactions', {id: element.id, selectedMonth: this.selectedMonth}]);
    } else {
      this.route.navigate(['/virtualAccount/transactions', {id: element.id, selectedMonth: this.selectedMonth}]);
    }
  }

  selectMonth(event: number) {
    this.store.dispatch((selectMonth({month: event})));
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

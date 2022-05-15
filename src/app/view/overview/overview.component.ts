import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import { LoggerService } from 'src/app/services/logger.service';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { OverviewService } from 'src/app/services/overview.service';
import { OverviewElement } from 'src/app/element/overviewelement';
import { select, Store } from '@ngrx/store';
import {
  selectMonthList,
  selectSelectedDate,
} from '../../state/date/date.selectors';
import { updateSelectedDate } from '../../state/date/date.actions';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent implements OnInit {
  months$: Observable<Date[]>;
  months: Date[];
  currentMonth$: Observable<Date>;
  initialSelectedMonth$: Observable<number>;
  accounts$: Observable<OverviewElement[]>;
  displayedColumns: string[] = ['name', 'balance', 'projection'];
  opened: boolean;

  constructor(
    private dateService: DateService,
    private logger: LoggerService,
    private overviewService: OverviewService,
    private route: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.logger.log('Init', 'OverviewComponent');
    this.months$ = this.store.pipe(
      select(selectMonthList),
      tap((months) => (this.months = months))
    );
    this.currentMonth$ = this.store.select(selectSelectedDate);

    this.accounts$ = this.currentMonth$.pipe(
      switchMap((selectedMonth) => {
        return this.overviewService.getOverview(selectedMonth);
      })
    );

    this.initialSelectedMonth$ = combineLatest([
      this.months$,
      this.currentMonth$,
    ]).pipe(
      filter(([months]) => months.length > 0),
      map(([months, month]) => months.indexOf(month))
    );
  }

  selectAccount(element: OverviewElement) {
    if (element.realAccount) {
      this.route.navigate(['/realAccount/transactions', { id: element.id }]);
    } else {
      this.route.navigate(['/virtualAccount/transactions', { id: element.id }]);
    }
  }

  selectMonth(event: number) {
    this.store.dispatch(
      updateSelectedDate({ selectedDate: this.months[event] })
    );
  }

  getShortName(date: Date): string {
    return this.dateService.getMonthShortString(date);
  }
}

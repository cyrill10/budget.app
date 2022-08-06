import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { DateService } from '../../services/date.service';
import { LoggerService } from '../../services/logger.service';
import { Router } from '@angular/router';
import {
  loadProcessData,
  loadProcessTransactions,
  loadTransferDetails,
  uploadFile,
} from '../../state/closing-process/closing-process.actions';
import {
  ClosingProcessStatus,
  ClosingProcessStatusEnum,
  ProcessData,
} from '../../state/closing-process/closing-process.reducers';
import { selectClosingProcessData } from '../../state/closing-process/closing-process.selectors';
import {
  selectMonthList,
  selectSelectedDate,
} from '../../state/date/date.selectors';
import { filter, map, tap } from 'rxjs/operators';
import { updateSelectedDate } from '../../state/date/date.actions';

@Component({
  selector: 'app-closing-process',
  templateUrl: './closing-process.component.html',
  styleUrls: ['./closing-process.component.css'],
})
export class ClosingProcessComponent implements OnInit {
  months$: Observable<Date[]>;
  months: Date[];
  currentMonth$: Observable<Date>;
  initialSelectedMonth$: Observable<number>;
  processData$: Observable<ProcessData>;

  @ViewChild('fileUpload') file: ElementRef;

  constructor(
    private dateService: DateService,
    private logger: LoggerService,
    private route: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.logger.log('Init', 'ClosingProcessComponent');
    this.months$ = this.store.pipe(
      select(selectMonthList),
      tap((months) => (this.months = months))
    );
    this.currentMonth$ = this.store
      .select(selectSelectedDate)
      .pipe(tap((_) => this.store.dispatch(loadProcessData())));

    this.initialSelectedMonth$ = combineLatest([
      this.months$,
      this.currentMonth$,
    ]).pipe(
      filter(([months]) => months.length > 0),
      map(([months, month]) => months.indexOf(month))
    );

    this.processData$ = this.store.select(selectClosingProcessData);
  }

  selectMonth(event: number) {
    this.store.dispatch(
      updateSelectedDate({ selectedDate: this.months[event] })
    );
  }

  getShortName(date: Date): string {
    return this.dateService.getMonthShortString(date);
  }

  uploadFile(uploadFileStatus: ClosingProcessStatus) {
    if (uploadFileStatus.value === ClosingProcessStatusEnum.NEW) {
      this.file.nativeElement.click();
    } else {
      this.store.dispatch(loadProcessTransactions());
    }
  }

  enterManualData() {
    console.log('enterManualDataClicked');
  }

  showTransferDetails() {
    this.store.dispatch(loadTransferDetails());
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.store.dispatch(uploadFile({ file }));
    }
  }
}

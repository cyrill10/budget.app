import { Component, Inject, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { VirtualAccountService } from 'src/app/services/virtualaccount.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { LoggerService } from 'src/app/services/logger.service';
import { Transaction } from 'src/app/element/transaction';
import { PaymentTypeService } from 'src/app/services/paymenttype.service';
import { IndicationService } from 'src/app/services/indication.service';
import { StatusService } from 'src/app/services/status.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { TransactionCreationDialogComponent } from './transaction.creation.component';
import { updateSelectedDate } from '../../state/date/date.actions';
import { select, Store } from '@ngrx/store';
import {
  selectMonthList,
  selectSelectedDate,
} from '../../state/date/date.selectors';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit {
  months$: Observable<Date[]>;
  months: Date[];
  currentMonth$: Observable<Date>;
  initialSelectedMonth$: Observable<number>;
  transactions$: Observable<Transaction[]>;
  opened: boolean;
  private readonly refreshTokenTransaction$ = new BehaviorSubject(undefined);

  constructor(
    private dateService: DateService,
    private logger: LoggerService,
    private transactionService: TransactionService,
    private virtualAccountService: VirtualAccountService,
    private paymentTypeService: PaymentTypeService,
    private indicationService: IndicationService,
    private statusService: StatusService,
    public dialog: MatDialog,
    private store: Store
  ) {}

  ngOnInit() {
    this.months$ = this.store.pipe(
      select(selectMonthList),
      tap((months) => (this.months = months))
    );
    this.currentMonth$ = this.store.select(selectSelectedDate);

    this.initialSelectedMonth$ = combineLatest([
      this.months$,
      this.currentMonth$,
    ]).pipe(
      filter(([months]) => months.length > 0),
      map(([months, month]) => months.indexOf(month))
    );

    this.transactions$ = combineLatest([
      this.refreshTokenTransaction$,
      this.currentMonth$,
    ]).pipe(
      switchMap(([, month]) => this.transactionService.getTransactions(month))
    );
  }

  selectMonth(event: number) {
    this.store.dispatch(
      updateSelectedDate({ selectedDate: this.months[event] })
    );
  }

  deleteTransaction(transaction: Transaction) {
    this.transactionService
      .deleteTransaction(transaction)
      .subscribe(() => this.refreshTokenTransaction$.next(undefined));
  }

  createDublicatesTillEndOfTheYear(transaction: Transaction) {
    this.transactionService
      .createDublicatesTillEndOfTheYear(transaction)
      .subscribe(() => this.refreshTokenTransaction$.next(undefined));
  }

  isForBudgetedAccount(transaction: Transaction) {
    return (
      transaction.effectiveAmount === 0 &&
      (transaction.creditedAccount.underlyingAccount.accountType.value === 5 ||
        transaction.debitedAccount.underlyingAccount.accountType.value === 5)
    );
  }

  openDialog(editedTransaction: Transaction, month: Date): void {
    let transaction: Transaction;
    if (editedTransaction === null) {
      transaction = {
        date: this.getSuggestedTransactionDate(month),
        budgetedAmount: 0,
        creditedAccount: null,
        debitedAccount: null,
        effectiveAmount: 0,
        id: null,
        indication: null,
        paymentType: null,
        paymentStatus: null,
        description: null,
      };
    } else {
      transaction = editedTransaction;
    }

    const isNew = editedTransaction === null;
    const statuses = this.statusService.getStatuses();
    const paymentTypes = this.paymentTypeService.getPaymentTypes();
    const indications = this.indicationService.getIndications();
    const virtualAccounts = this.virtualAccountService.getVirtualAccounts();
    const dialogRef = this.dialog.open(TransactionCreationDialogComponent, {
      data: {
        transaction,
        virtualAccounts,
        paymentTypes,
        statuses,
        indications,
        isNew,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (editedTransaction === null) {
          this.transactionService
            .addTransaction(result.transaction)
            .subscribe(() => this.refreshTokenTransaction$.next(undefined));
        } else {
          this.transactionService
            .updateTransaction(result.transaction)
            .subscribe(() => this.refreshTokenTransaction$.next(undefined));
        }
      } else {
        this.refreshTokenTransaction$.next(undefined);
      }
    });
  }

  getSuggestedTransactionDate(selectedMonth: Date): Date {
    const now = new Date(Date.now());
    if (
      now.getMonth() === selectedMonth.getMonth() &&
      now.getFullYear() === selectedMonth.getFullYear()
    ) {
      return now;
    }
    const endOfMonth = new Date(selectedMonth);
    endOfMonth.setDate(25);
    return endOfMonth;
  }

  getShortName(date: Date): string {
    return this.dateService.getMonthShortString(date);
  }

  openDuplicateDialog(selectedTransaction: Transaction): void {
    const dialogRef = this.dialog.open(TransactionDuplicationDialogComponent, {
      data: selectedTransaction,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.createDublicatesTillEndOfTheYear(selectedTransaction);
      }
    });
  }

  getStatusColor(value: number): string {
    switch (value) {
      case 2:
        return 'yellow';
      case 3:
        return 'green';
      default:
        return 'red';
    }
  }
}

@Component({
  selector: 'app-transaction-duplication-dialog',
  templateUrl: 'transaction-duplication-dialog.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionDuplicationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TransactionDuplicationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Transaction
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

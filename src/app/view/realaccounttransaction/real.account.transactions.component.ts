import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { VirtualAccountService } from 'src/app/services/virtualaccount.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { DateService } from 'src/app/services/date.service';
import { Transaction } from 'src/app/element/transaction';
import { TransactionCreationDialogComponent } from '../transaction/transaction.creation.component';
import { PaymentTypeService } from 'src/app/services/paymenttype.service';
import { IndicationService } from 'src/app/services/indication.service';
import { StatusService } from 'src/app/services/status.service';
import { MatDialog } from '@angular/material/dialog';
import { TransactionElement } from 'src/app/element/transactionelement';
import { Account } from 'src/app/element/account';
import { AccountService } from 'src/app/services/account.service';
import { select, Store } from '@ngrx/store';
import {
  selectMonthList,
  selectSelectedDate,
} from '../../state/date/date.selectors';
import { updateSelectedDate } from '../../state/date/date.actions';

@Component({
  selector: 'app-virtualaccounttransaction',
  templateUrl: './real.account.transactions.component.html',
  styleUrls: ['./real.account.transactions.component.css'],
})
export class RealAccountTransactionsComponent implements OnInit {
  realAccount$: Observable<Account>;
  months$: Observable<Date[]>;
  months: Date[];
  currentMonth$: Observable<Date>;
  initialSelectedMonth$: Observable<number>;
  opened: boolean;
  displayedColumns: string[] = ['name', 'amount', 'balance'];
  transactions$: Observable<TransactionElement[]>;
  private readonly refreshTokenTransaction$ = new BehaviorSubject(undefined);

  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService,
    private dateService: DateService,
    private accountService: AccountService,
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

    this.realAccount$ = this.route.paramMap.pipe(
      switchMap((params) => this.accountService.getAccount(params.get('id')))
    );

    this.transactions$ = combineLatest([
      this.refreshTokenTransaction$,
      this.currentMonth$,
      this.realAccount$,
    ]).pipe(
      switchMap(([, month, account]) =>
        this.transactionService.getTransactionsForRealAccount(account, month)
      )
    );
    this.refreshTokenTransaction$.next(undefined);
  }

  selectMonth(event: number) {
    this.store.dispatch(
      updateSelectedDate({ selectedDate: this.months[event] })
    );
  }

  getShortName(date: Date): string {
    return this.dateService.getMonthShortString(date);
  }

  selectTranaction(
    editedTransaction: TransactionElement,
    selectedMonth: Date
  ): void {
    if (
      editedTransaction === null ||
      editedTransaction.id === '0' ||
      editedTransaction.id === '2147483646' ||
      editedTransaction.id === '2147483647'
    ) {
      const transaction = {
        date: this.getSuggestedTransactionDate(selectedMonth),
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
      this.openDialog(transaction, true);
    } else {
      this.transactionService
        .getTransaction(editedTransaction.id)
        .subscribe((t) => this.openDialog(t, false));
    }
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

  isInTheFuture(month: Date): boolean {
    return this.dateService.isInTheFuture(month);
  }

  private openDialog(transaction: Transaction, isNew: boolean) {
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
        if (isNew) {
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
}

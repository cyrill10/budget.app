import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { VirtualAccountService } from 'src/app/services/virtualaccount.service';
import { VirtualAccount } from 'src/app/element/virtualaccount';
import { FormControl } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';
import { DateService } from 'src/app/services/date.service';
import { Transaction } from 'src/app/element/transaction';
import { TransactionCreationDialogComponent } from '../transaction/transaction.creation.component';
import { LoggerService } from 'src/app/services/logger.service';
import { PaymentTypeService } from 'src/app/services/paymenttype.service';
import { IndicationService } from 'src/app/services/indication.service';
import { StatusService } from 'src/app/services/status.service';
import { MatDialog } from '@angular/material/dialog';
import { TransactionElement } from 'src/app/element/transactionelement';

@Component({
  selector: 'app-virtualaccounttransaction',
  templateUrl: './virtual.account.transactions.component.html',
  styleUrls: ['./virtual.account.transactions.component.css']
})
export class VirtualAccountTransactionsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private virtualAcccountService: VirtualAccountService,
    private transactionService: TransactionService,
    private dateService: DateService,
    private logger: LoggerService,
    private virtualAccountService: VirtualAccountService,
    private paymentTypeService: PaymentTypeService,
    private indicationService: IndicationService,
    private statusService: StatusService,
    public dialog: MatDialog) {
    }

  virtualAccount: VirtualAccount;
  selectedId: number;
  month = new Date(Date.now());
  selected = new FormControl(0);
  opened: boolean;
  private readonly refreshTokenTransaction$ = new BehaviorSubject(undefined);
  transactions = this.refreshTokenTransaction$.pipe(
    switchMap(() => this.transactionService.getTransactionsForVirtualAccount(this.virtualAccount, this.month))
  );
  months: Date[];
  displayedColumns: string[] = ['name', 'amount', 'balance'];


  ngOnInit() {
    this.dateService.getMonths().subscribe(data => {
      this.months = data;
      const virtualAccount$ = this.route.paramMap.pipe(
        switchMap(params => {
          if (params.get('selectedMonth') !== null && params.get('selectedMonth') !== undefined) {
            this.selectMonthFromString(params.get('selectedMonth'));
          } else {
            this.dateService.getCurrent().subscribe(d => this.selected.setValue(d));
          }
          return this.virtualAcccountService.getVirtualAccount(params.get('id'));
        })
      );
      virtualAccount$.subscribe(d => {
        this.virtualAccount = d;
        this.transactions = this.refreshTokenTransaction$.pipe(
          switchMap(() => this.transactionService.getTransactionsForVirtualAccount(this.virtualAccount, this.month)));
      }
      );
    });
  }

  selectMonth(event: Event) {
    this.selected.setValue(event);
    this.recalcMonth();
  }

  selectMonthFromString(value: string) {
    this.selected.setValue(parseInt(value, 10));
    this.recalcMonth();
  }

  private recalcMonth() {
    this.month = this.months[this.selected.value];
    this.refreshTokenTransaction$.next(undefined);
  }

    getShortName(date: Date): string {
    return this.dateService.getMonthShortString(date);
  }

    selectTranaction(editedTransaction: TransactionElement): void {
      if (editedTransaction === null || editedTransaction.id === 0) {
        const transaction = {
          date: this.getSuggestedTransactionDate(this.month),
          budgetedAmount: 0, creditedAccount: this.virtualAccount,
          debitedAccount: this.virtualAccount, effectiveAmount: 0,
          id: null, indication: null, paymentType: null, paymentStatus: null, description: null
        };
        this.openDialog(transaction, true);
      } else {
        this.transactionService.getTransaction(editedTransaction.id).subscribe(t => this.openDialog(t, false));
      }
  }
  private openDialog(transaction: Transaction, isNew: boolean) {
    const statuses = this.statusService.getStatuses();
    const paymentTypes = this.paymentTypeService.getPaymentTypes();
    const indications = this.indicationService.getIndications();
    const virtualAccounts = this.virtualAccountService.getVirtualAccounts();

    const dialogRef = this.dialog.open(TransactionCreationDialogComponent, {
      data: { transaction, virtualAccounts, paymentTypes, statuses, indications, isNew }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (isNew) {
          this.transactionService.addTransaction(result.transaction)
            .subscribe(() => this.refreshTokenTransaction$.next(undefined));
        } else {
          this.transactionService.updateTransaction(result.transaction)
            .subscribe(() => this.refreshTokenTransaction$.next(undefined));
        }
      } else {
        this.refreshTokenTransaction$.next(undefined);
      }
    });
  }

    getSuggestedTransactionDate(selectedMonth: Date): Date {
    const now = new Date(Date.now());
    if (now.getMonth() === selectedMonth.getMonth() &&
        now.getFullYear() === selectedMonth.getFullYear()) {
          return now;
    }
    const endOfMonth = new Date(selectedMonth);
    endOfMonth.setDate(25);
    return endOfMonth;
  }

  isInTheFuture(): boolean {
    return this.dateService.isInTheFuture(this.month);
  }


}

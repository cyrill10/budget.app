import { Component, OnInit, Inject } from '@angular/core';
import { DateService } from '../../services/date.service';
import { FormControl } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';
import { VirtualAccountService } from 'src/app/services/virtualaccount.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoggerService } from 'src/app/services/logger.service';
import { Transaction } from 'src/app/element/transaction';
import { PaymentTypeService } from 'src/app/services/paymenttype.service';
import { IndicationService } from 'src/app/services/indication.service';
import { StatusService } from 'src/app/services/status.service';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TransactionCreationDialogComponent } from './transaction.creation.component';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  month = new Date(Date.now());
  selected: FormControl;
  opened: boolean;
  private readonly refreshTokenTransaction$ = new BehaviorSubject(undefined);
  transactions = this.refreshTokenTransaction$.pipe(
    switchMap(() => this.transactionService.getTransactions(this.month))
  );
  months: Date[];

  constructor(
    private dateService: DateService,
    private logger: LoggerService,
    private transactionService: TransactionService,
    private virtualAccountService: VirtualAccountService,
    private paymentTypeService: PaymentTypeService,
    private indicationService: IndicationService,
    private statusService: StatusService,
    public dialog: MatDialog) {
    this.dateService.getMonths().subscribe(data => this.months = data);
    this.dateService.getCurrent().subscribe(d => this.selected = new FormControl(d));
  }

  ngOnInit() {
    this.logger.log('Init transaction.component');
  }

  selectMonth(event: Event) {
    this.selected.setValue(event);
    this.month = this.months[this.selected.value];
    this.refreshTokenTransaction$.next(undefined);
  }

  deleteTransaction(transaction: Transaction) {
    this.transactionService.deleteTransaction(transaction)
      .subscribe(() => this.refreshTokenTransaction$.next(undefined));
  }

  createDublicatesTillEndOfTheYear(transaction: Transaction) {
    this.transactionService.createDublicatesTillEndOfTheYear(transaction)
      .subscribe(() => this.refreshTokenTransaction$.next(undefined));

  }

  openDialog(editedTransaction: Transaction): void {
    let transaction: Transaction;
    if (editedTransaction === null) {
      transaction = {
        date: this.getSuggestedTransactionDate(this.month),
        budgetedAmount: 0, creditedAccount: null,
        debitedAccount: null, effectiveAmount: 0,
        id: null, indication: null, paymentType: null, paymentStatus: null, description: null
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
      data: { transaction, virtualAccounts, paymentTypes, statuses, indications, isNew }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (editedTransaction === null) {
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

  getShortName(date: Date): string {
    return this.dateService.getMonthShortString(date);
  }


  openDublicateDialog(selectedTransaction: Transaction): void {
    const dialogRef = this.dialog.open(TransactionDublicationDialogComponent, {
      data: selectedTransaction
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.createDublicatesTillEndOfTheYear(selectedTransaction);
      }
    });
  }
}
@Component({
  selector: 'app-transatction-dublication-dialog',
  templateUrl: 'transatction-dublication-dialog.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionDublicationDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<TransactionDublicationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Transaction) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}




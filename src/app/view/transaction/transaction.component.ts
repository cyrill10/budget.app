import { Component, OnInit, Inject } from '@angular/core';
import { DateService } from '../../services/date.service';
import { Month } from 'src/app/date/month';
import { FormControl } from '@angular/forms';
import { TransactionService } from 'src/app/services/transaction.service';
import { VirtualAccountService } from 'src/app/services/virtualaccount.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoggerService } from 'src/app/services/logger.service';
import { VirtualAccount } from 'src/app/element/virtualaccount';
import { Transaction } from 'src/app/element/transaction';
import { PaymentType } from 'src/app/element/paymenttype';
import { Status } from 'src/app/element/status';
import { Indication } from 'src/app/element/indication';
import { PaymentTypeService } from 'src/app/services/paymenttype.service';
import { IndicationService } from 'src/app/services/indication.service';
import { StatusService } from 'src/app/services/status.service';
import { Observable } from 'rxjs';


export interface DialogData {
  transaction: Transaction;
  virtualAccounts: Observable<VirtualAccount[]>;
  statuses: Observable<Status[]>;
  paymentTypes: Observable<PaymentType[]>;
  indications: Observable<Indication[]>;
}

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  month: Month;
  months = this.getMonths();
  selected = new FormControl(0);
  transactions: Transaction[];
  opened: boolean;

  constructor(
    private dateService: DateService,
    private logger: LoggerService,
    private transactionService: TransactionService,
    private virtaulAccountService: VirtualAccountService,
    private paymentTypeService: PaymentTypeService,
    private indicationService: IndicationService,
    private statusService: StatusService,
    public dialog: MatDialog) { }

  getMonths() {
    return this.dateService.getMonths();
  }

  selectMonth(event: Event) {
    this.selected.setValue(event);
    this.month = this.dateService.getMonthsById(this.selected.value);
  }

  deleteTransaction(transaction: Transaction) {
    this.logger.log(transaction);
    // TODO delete and reload
  }

  openDialog(editedTransaction: Transaction): void {
    let transaction: Transaction;
    if (editedTransaction === null) {
      transaction = {
        date: new Date(Date.now()),
        budgetedAmount: 0, creditedAccount: null,
        debitedAccount: null, effectiveAmount: 0,
        id: 1, indication: null, paymentType: null, status: null
      };
    } else {
      transaction = editedTransaction;
    }

    const statuses = this.statusService.getStatuses();
    const paymentTypes = this.paymentTypeService.getPaymentTypes();
    const indications = this.indicationService.getIndications();
    const virtualAccounts = this.virtaulAccountService.getVirtualAccounts();
    const dialogRef = this.dialog.open(TransactionCreationDialogComponent, {
      data: { transaction, virtualAccounts, paymentTypes, statuses, indications }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.logger.log(result.transaction);
        if (editedTransaction !== null) {
         const index = this.transactions.indexOf(editedTransaction);
         this.transactions.splice(index, 1);
        }
        this.transactions.push(result.transaction);
        // TODO save and reload Transactions
      }
    });
  }

  ngOnInit() {
    this.logger.log('Init transaction.component');
    const monthInt = new Date(Date.now()).getMonth();
    this.selected = new FormControl(monthInt);
    this.month = this.dateService.getMonthsById('' + monthInt);
    this.transactions = this.transactionService.getTransactions();
  }
}

@Component({
  selector: 'app-transatction-creation-dialog',
  templateUrl: 'transatction-creation-dialog.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionCreationDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<TransactionCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  compareStatus(value1: Status, value2: Status) {
    if (value1 !== null && value2 !== null) {
      return value1.name === value2.name;
    }
  }

  compareVirtualAccount(value1: VirtualAccount, value2: VirtualAccount) {
    if (value1 !== null && value2 !== null) {
      return value1.id === value2.id;
    }
  }

  comparePaymentType(value1: PaymentType, value2: PaymentType) {
    if (value1 !== null && value2 !== null) {
      return value1.name === value2.name;
    }
  }

  compareIndication(value1: Indication, value2: Indication) {
    if (value1 !== null && value2 !== null) {
      return value1.name === value2.name;
    }
  }
  isDisabled(transaction: Transaction): boolean {
    let active = true;
    active = active && transaction.creditedAccount !== null;
    active = active && transaction.debitedAccount !== null;
    active = active && transaction.paymentType !== null;
    active = active && transaction.indication !== null;
    active = active && transaction.status !== null;
    active = active && transaction.budgetedAmount !== null;
    active = active && transaction.date !== null;
    return !active;
  }
}

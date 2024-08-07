import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VirtualAccount } from 'src/app/element/virtualaccount';
import { Transaction } from 'src/app/element/transaction';
import { PaymentType } from 'src/app/element/paymenttype';
import { Status } from 'src/app/element/status';
import { Indication } from 'src/app/element/indication';
import { Observable } from 'rxjs';

export interface DialogData {
  transaction: Transaction;
  virtualAccounts: Observable<VirtualAccount[]>;
  statuses: Observable<Status[]>;
  paymentTypes: Observable<PaymentType[]>;
  indications: Observable<Indication[]>;
  isNew: boolean;
}

@Component({
  selector: 'app-transaction-creation-dialog',
  templateUrl: 'transaction-creation-dialog.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionCreationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TransactionCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  compareVirtualAccount(value1: VirtualAccount, value2: VirtualAccount) {
    if (value1 !== null && value2 !== null) {
      return value1.id === value2.id;
    }
  }

  isDisabled(transaction: Transaction): boolean {
    let active = true;
    active = active && transaction.creditedAccount !== null;
    active = active && transaction.debitedAccount !== null;
    active = active && transaction.paymentStatus !== null;
    active = active && transaction.budgetedAmount !== null;
    active = active && transaction.date !== null;
    active = active && transaction.description !== null;
    return !active;
  }

  canMakeEffective(transaction: Transaction): boolean {
    return (
      transaction.budgetedAmount !== null &&
      transaction.budgetedAmount > 0 &&
      transaction.effectiveAmount === 0
    );
  }

  makeEffective(transaction: Transaction) {
    transaction.effectiveAmount = transaction.budgetedAmount;
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VirtualAccount } from '../../../element/virtualaccount';

export interface ScannedTransactionDialogData {
  virtualAccounts: VirtualAccount[];
  creditedAccount: VirtualAccount;
  debitedAccount: VirtualAccount;
}

@Component({
  selector: 'app-scanned-transaction-creation-dialog',
  templateUrl: './creation-dialog.component.html',
  styleUrls: ['./creation-dialog.component.css'],
})
export class CreationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ScannedTransactionDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  compareVirtualAccount(value1: VirtualAccount, value2: VirtualAccount) {
    if (value1 !== null && value2 !== null) {
      return value1.id === value2.id;
    }
  }

  isDisabled(data: ScannedTransactionDialogData): boolean {
    let active = true;
    active = active && data.creditedAccount !== null;
    active = active && data.debitedAccount !== null;
    return !active;
  }
}

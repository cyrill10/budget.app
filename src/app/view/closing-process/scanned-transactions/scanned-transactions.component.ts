import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSelectedDate } from '../../../state/date/date.selectors';
import { ScannedTransaction } from '../../../state/closing-process/closing-process.reducers';
import { selectScannedTransactions } from '../../../state/closing-process/closing-process.selectors';
import { filter, map, tap } from 'rxjs/operators';
import { VirtualAccount } from '../../../element/virtualaccount';
import { VirtualAccountService } from '../../../services/virtualaccount.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CreationDialogComponent } from '../creation-dialog/creation-dialog.component';
import {
  finishUpload,
  saveProcessTransactions,
} from '../../../state/closing-process/closing-process.actions';
import { MatLegacySelectionList as MatSelectionList } from '@angular/material/legacy-list';

@Component({
  selector: 'app-scanned-transactions',
  templateUrl: './scanned-transactions.component.html',
  styleUrls: ['./scanned-transactions.component.css'],
})
export class ScannedTransactionsComponent implements OnInit {
  constructor(
    private route: Router,
    private store: Store,
    private virtualAccountService: VirtualAccountService,
    public dialog: MatDialog
  ) {}

  currentMonth$: Observable<Date>;
  scannedTransactions$: Observable<ScannedTransaction[]>;
  billTotal$: Observable<number>;
  virtualAccounts$: Observable<VirtualAccount[]>;
  selectedAccount$: Observable<VirtualAccount>;

  selectedTransactions: string[];

  @ViewChild('selectedTransactionList')
  selectedTransactionList: MatSelectionList;

  ngOnInit(): void {
    this.currentMonth$ = this.store.select(selectSelectedDate);
    this.scannedTransactions$ = this.store.select(selectScannedTransactions);

    this.virtualAccounts$ = this.virtualAccountService.getVirtualAccounts();

    this.selectedAccount$ = this.virtualAccounts$.pipe(
      map((vas) =>
        vas.find((va) => va.name.includes('Miles') && va.name.includes('More'))
      )
    );

    this.billTotal$ = this.scannedTransactions$.pipe(
      filter((list) => !!list && list.length > 0),
      tap((_) => (this.selectedTransactions = [])),
      map((transactionList) =>
        transactionList.map((t) => t.amount).reduce((t1, t2) => t1 + t2)
      )
    );
  }

  navigateToToProcess() {
    this.route.navigate(['/closingProcess']);
  }

  finishUpload() {
    this.store.dispatch(finishUpload());
  }

  createTransactionForSelected(
    virtualAccounts: VirtualAccount[],
    selectedVirtualAccount: VirtualAccount
  ) {
    if (this.selectedTransactions && this.selectedTransactions.length > 0) {
      const dialogRef = this.dialog.open(CreationDialogComponent, {
        data: {
          virtualAccounts,
          creditedAccount: selectedVirtualAccount,
          debitedAccount: selectedVirtualAccount,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result !== undefined) {
          let throughAccountId;
          if (
            result.debitedAccount.underlyingAccount.accountType.value !== 3 &&
            result.creditedAccount.underlyingAccount.accountType.value !== 3
          ) {
            throughAccountId = selectedVirtualAccount.id;
          }
          this.store.dispatch(
            saveProcessTransactions({
              transactionIds: this.selectedTransactions,
              creditedAccountId: result.creditedAccount.id,
              debitedAccountId: result.debitedAccount.id,
              throughAccountId,
            })
          );
          this.selectedTransactionList.deselectAll();
        }
      });
    }
  }
}

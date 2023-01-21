import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ReoccurringTransaction } from 'src/app/element/reoccurringtransaction';
import { PaymentTypeService } from 'src/app/services/paymenttype.service';
import { ReoccurringTransactionService } from 'src/app/services/reoccurring-transaction.service';
import { VirtualAccountService } from 'src/app/services/virtualaccount.service';

@Component({
  selector: 'app-reoccurringtransaction',
  templateUrl: './reoccurringtransaction.component.html',
  styleUrls: ['./reoccurringtransaction.component.scss'],
})
export class ReoccurringTransactionComponent implements OnInit {

  constructor(
    private reoccurringTransactionService: ReoccurringTransactionService,
    private virtualAccountService: VirtualAccountService,
    private paymentTypeService: PaymentTypeService) { }

  private readonly refreshToken$ = new BehaviorSubject(undefined);
  readonly reoccuringTransactions$ = this.refreshToken$.pipe(
    switchMap(() => this.reoccurringTransactionService.getReoccuringTransactions())
  );


  ngOnInit() {}

  editReoccurringTransaction(editedReoccuringTransaction: ReoccurringTransaction): void {
    let rt: ReoccurringTransaction;
    if (editedReoccuringTransaction === null) {
      rt = {
        amount: 0,
        creditedAccount: null,
        debitedAccount: null,
        id: null,
        paymentType: null,
        description: null,
        occurringMonths: [],
        transactions: [],
        creationDate: null
      };
    } else {
      rt = editedReoccuringTransaction;
    }

    const isNew = editedReoccuringTransaction === null;
    const paymentTypes = this.paymentTypeService.getPaymentTypes();
    const virtualAccounts = this.virtualAccountService.getVirtualAccounts();
   /*  const dialogRef = this.dialog.open(TransactionCreationDialogComponent, {
      data: {
        transaction,
        virtualAccounts,
        paymentTypes,
        statuses,
        indications,
        isNew,
      },
    }); */
  }
}

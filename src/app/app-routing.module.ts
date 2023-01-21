import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './view/overview/overview.component';
import { TransactionComponent } from './view/transaction/transaction.component';
import { AccountComponent } from './view/account/account.component';
import { VirtualAccountTransactionsComponent } from './view/virtualaccounttransactions/virtual.account.transactions.component';
import { RealAccountTransactionsComponent } from './view/realaccounttransaction/real.account.transactions.component';
import { ClosingProcessComponent } from './view/closing-process/closing-process.component';
import { ScannedTransactionsComponent } from './view/closing-process/scanned-transactions/scanned-transactions.component';
import { TransferDetailsComponent } from './view/closing-process/transfer-details/transfer-details.component';
import { ReoccurringTransactionComponent } from './view/reoccurringtransaction/reoccurringtransaction.component';

const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'account', component: AccountComponent },
  {
    path: 'virtualAccount/transactions',
    component: VirtualAccountTransactionsComponent,
  },
  {
    path: 'realAccount/transactions',
    component: RealAccountTransactionsComponent,
  },
  { path: 'closingProcess', component: ClosingProcessComponent },
  {
    path: 'closingProcess/transactions',
    component: ScannedTransactionsComponent,
  },
  {
    path: 'closingProcess/transferDetail',
    component: TransferDetailsComponent,
  },
  { path: 'reoccurringTransactions', component: ReoccurringTransactionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

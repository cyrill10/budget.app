import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './view/overview/overview.component';
import { TransactionComponent } from './view/transaction/transaction.component';
import { AccountComponent } from './view/account/account.component';
import { VirtualAccountTransactionsComponent } from './view/virtualaccounttransactions/virtual.account.transactions.component';
import { RealAccountTransactionsComponent } from './view/realaccounttransaction/real.account.transactions.component';

const routes: Routes = [
      { path: '', redirectTo: '/overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'transaction', component: TransactionComponent  },
      { path: 'account', component: AccountComponent },
      { path: 'virtualAccount/transactions', component: VirtualAccountTransactionsComponent },
      { path: 'realAccount/transactions', component: RealAccountTransactionsComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

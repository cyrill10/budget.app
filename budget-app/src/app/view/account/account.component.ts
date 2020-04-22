import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/element/account';
import { VirtualAccount } from 'src/app/element/virtualaccount';
import { LoggerService } from 'src/app/services/logger.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountType } from 'src/app/element/accounttype';
import { AccountTypeService } from 'src/app/services/accounttype.service';
import { VirtualAccountService } from 'src/app/services/virtualaccount.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface AccountDialogData {
  account: Account;
  accountTypes: Observable<AccountType[]>;
}

export interface VirtualAccountDialogData {
  virtualAccount: VirtualAccount;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  displayedColumns: string[] = ['name', 'detail', 'edit'];
  opened: boolean;
  private readonly refreshToken$ = new BehaviorSubject(undefined);
  readonly accounts = this.refreshToken$.pipe(
    switchMap(() => this.accountService.getAccounts())
  );

  constructor(private accountService: AccountService,
              private accountTypeService: AccountTypeService,
              private virtualAccountService: VirtualAccountService,
              private logger: LoggerService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
   }

   getVirtualAccount(account: Account): Observable<VirtualAccount[]> {
      return this.virtualAccountService.getVirtualAccountsForAccount(account.id);
   }

  deleteAccount(account: Account) {
    this.logger.log(account);
    // TODO delete and reload
  }

  editAccount(editedAccount: Account): void {
    let account: Account;
    if (editedAccount === null) {
      account = {
        id: null,
        name: null,
        accountType: null,
        virtualAccounts: null,
        getVirtualAccounts: Account.prototype.getVirtualAccounts
      };
    } else {
      account = editedAccount;
    }
    const accountTypes = this.accountTypeService.getAccountTypes();
    const accountDialog = this.dialog.open(AccountCreationDialogComponent, {
      data: { account, accountTypes }
    });

    accountDialog.afterClosed().subscribe(result => {
      if (result !== undefined) {
         if (editedAccount === null) {
          this.accountService.addAccount(result.account)
          .subscribe(() => this.refreshToken$.next(undefined));
         }else {
           this.accountService.updateAccount(result.account)
          .subscribe(() => this.refreshToken$.next(undefined));
         }
      }else {
        this.refreshToken$.next(undefined);
      }
    });
  }

  deleteVirtualAccount(account: VirtualAccount) {
    this.logger.log(account);
    // TODO delete and reload
  }

  editVirtualAccount(editedAccount: VirtualAccount, account: Account): void {
    let virtualAccount: VirtualAccount;
    if (editedAccount === null) {
      virtualAccount = {
        id: null,
        name: null,
        underlyingAccount: account,
        may: null,
        june: null,
        projection: null,
      };
    } else {
      virtualAccount = editedAccount;
    }
    const virtualAccountDialog = this.dialog.open(VirtualAccountCreationDialogComponent, {
      data: { virtualAccount }
    });

    virtualAccountDialog.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (editedAccount === null) {
          this.virtualAccountService.addVirtualAccount(result.virtualAccount)
            .subscribe(() => this.refreshToken$.next(undefined));
        } else {
          this.virtualAccountService.updateVirtualAccount(result.virtualAccount)
            .subscribe(() => this.refreshToken$.next(undefined));
        }
      } else {
        this.refreshToken$.next(undefined);
      }
    });
  }
}

@Component({
  selector: 'app-account-creation-dialog',
  templateUrl: 'account-creation-dialog.html',
  styleUrls: ['./account.component.css']
})
export class AccountCreationDialogComponent {

  constructor(
    public accountDialog: MatDialogRef<AccountCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AccountDialogData) { }

  onNoClick(): void {
    this.accountDialog.close();
  }

  isDisabled(account: Account): boolean {
    let active = true;
    active = active && account.name !== null;
    active = active && account.accountType !== null;
    return !active;
  }
}


@Component({
  selector: 'app-account-creation-dialog',
  templateUrl: 'virtual-account-creation-dialog.html',
  styleUrls: ['./account.component.css']
})
export class VirtualAccountCreationDialogComponent {

  constructor(
    public virtualAccountDialog: MatDialogRef<VirtualAccountCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VirtualAccountDialogData) { }

  onNoClick(): void {
    this.virtualAccountDialog.close();
  }

  isDisabled(virtualAccount: VirtualAccount): boolean {
    let active = true;
    active = active && virtualAccount.name !== null;
    return !active;
  }
}

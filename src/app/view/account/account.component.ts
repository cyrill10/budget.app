import { Component, OnInit, Inject } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/element/account';
import { VirtualAccount } from 'src/app/element/virtualaccount';
import { LoggerService } from 'src/app/services/logger.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AccountType } from 'src/app/element/accounttype';
import { AccountTypeService } from 'src/app/services/accounttype.service';
import { VirtualAccountService } from 'src/app/services/virtualaccount.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AccountDialogData {
  account: Account;
  accountTypes: Observable<AccountType[]>;
  isNew: boolean;
}

export interface VirtualAccountDialogData {
  virtualAccount: VirtualAccount;
  new: boolean;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  displayedColumns: string[] = ['name', 'edit'];
  opened: boolean;
  private readonly refreshToken$ = new BehaviorSubject(undefined);
  readonly accounts = this.refreshToken$.pipe(
    switchMap(() => this.accountService.getAccounts())
  );

  constructor(
    private accountService: AccountService,
    private accountTypeService: AccountTypeService,
    private virtualAccountService: VirtualAccountService,
    private logger: LoggerService,
    public dialog: MatDialog,
    private route: Router
  ) {}

  ngOnInit(): void {}

  selectAccount(account: Account) {
    this.route.navigate(['/realAccount/transactions', { id: account.id }]);
  }

  selectVirtualAccount(account: VirtualAccount) {
    this.route.navigate(['/virtualAccount/transactions', { id: account.id }]);
  }

  deleteAccount(account: Account) {
    this.logger.log(account, 'AccountComponent');
    // TODO delete and reload
  }

  editAccount(editedAccount: Account): void {
    let account: Account;
    if (editedAccount === null) {
      account = {
        id: null,
        name: null,
        accountType: null,
      };
    } else {
      account = editedAccount;
    }
    const isNew = editedAccount === null;
    const accountTypes = this.accountTypeService.getAccountTypes();
    const accountDialog = this.dialog.open(AccountCreationDialogComponent, {
      data: { account, accountTypes, isNew },
    });

    accountDialog.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (editedAccount === null) {
          this.accountService
            .addAccount(result.account)
            .subscribe(() => this.refreshToken$.next(undefined));
        } else {
          this.accountService
            .updateAccount(result.account)
            .subscribe(() => this.refreshToken$.next(undefined));
        }
      } else {
        this.refreshToken$.next(undefined);
      }
    });
  }

  deleteVirtualAccount(account: VirtualAccount) {
    this.logger.log(account, 'AccountComponent');
    // TODO delete and reload
  }

  editVirtualAccount(editedAccount: VirtualAccount, account: Account): void {
    let virtualAccount: VirtualAccount;
    if (editedAccount === null) {
      virtualAccount = {
        id: null,
        name: null,
        underlyingAccount: account,
      };
    } else {
      virtualAccount = editedAccount;
    }
    const virtualAccountDialog = this.dialog.open(
      VirtualAccountCreationDialogComponent,
      {
        data: { virtualAccount },
      }
    );

    virtualAccountDialog.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (editedAccount === null) {
          this.virtualAccountService
            .addVirtualAccount(result.virtualAccount)
            .subscribe(() => this.refreshToken$.next(undefined));
        } else {
          this.virtualAccountService
            .updateVirtualAccount(result.virtualAccount)
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
  styleUrls: ['./account.component.css'],
})
export class AccountCreationDialogComponent {
  constructor(
    public accountDialog: MatDialogRef<AccountCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AccountDialogData
  ) {}

  onNoClick(): void {
    this.accountDialog.close();
  }

  isDisabled(account: Account): boolean {
    let active = true;
    active = active && account.name !== null;
    active = active && account.accountType !== null;
    return !active;
  }

  compareType(value1: AccountType, value2: AccountType) {
    if (value1 !== null && value2 !== null) {
      return value1.value === value2.value;
    }
  }
}

@Component({
  selector: 'app-account-creation-dialog',
  templateUrl: 'virtual-account-creation-dialog.html',
  styleUrls: ['./account.component.css'],
})
export class VirtualAccountCreationDialogComponent {
  constructor(
    public virtualAccountDialog: MatDialogRef<VirtualAccountCreationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VirtualAccountDialogData
  ) {}

  onNoClick(): void {
    this.virtualAccountDialog.close();
  }

  isDisabled(virtualAccount: VirtualAccount): boolean {
    let active = true;
    active = active && virtualAccount.name !== null;
    return !active;
  }
}

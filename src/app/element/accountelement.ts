import { VirtualAccount } from './virtualaccount';
import { Account } from './account';

export class AccountElement {
    realAccount: Account;
    virtualAccounts: VirtualAccount[];
}

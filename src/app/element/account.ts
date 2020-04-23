import { VirtualAccount } from './virtualaccount';
import { AccountType } from './accounttype';

export class Account {
    id: number;
    name: string;
    accountType: AccountType;
    virtualAccounts: VirtualAccount[];

    getVirtualAccounts() {
        return this.virtualAccounts;
    }
}

import { Account } from './account';

export class VirtualAccount {
    id: number;
    name: string;
    underlyingAccount: Account;
    projection: number;
}

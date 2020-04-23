import { Account } from './account';

export class VirtualAccount {
    id: number;
    name: string;
    underlyingAccount: Account;
    may: number;
    june: number;
    projection: number;
}

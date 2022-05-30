import { Account } from './account';

export class VirtualAccount {
  id: string;
  name: string;
  underlyingAccount: Account;
  projection: number;
}

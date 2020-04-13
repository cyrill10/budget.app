import { VirtualAccount } from './virtualaccount';

export class Transaction {
    id: number;
    creditedAccount: VirtualAccount;
    debitedAccount: VirtualAccount;
    paymentType: string;
    indication: string;
    status: string;

    constructor(id: number, creditedAccount: VirtualAccount, debitedAccount: VirtualAccount,
                paymentType: string, indication: string, status: string) {
        this.id = id;
        this.creditedAccount = creditedAccount;
        this.debitedAccount = debitedAccount;
        this.paymentType = paymentType;
        this.indication = indication;
        this.status = status;
    }
}

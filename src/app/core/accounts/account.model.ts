import { Transaction } from '../accounts/transaction.model';

export class Account {
  accountId: string;
  accountNumber: string;
  name: string;
  type: string;
  balance: string;
  transactions: Array<Transaction>;
}


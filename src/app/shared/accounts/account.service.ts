import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Account } from './account.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }

  getUserAccounts(): Observable<Array<Account>> {
    return this.http.get<Array<Account>>(`${environment.API_URL}/banking/accounts`);
  }

  getTotalAccountsBalance(accounts: Array<Account>) {
    let balance = 0;
    accounts.forEach(account => {
      balance += account.balance;
    });
    return balance;
  }
}

import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { User } from './user/user.model';

@Injectable()
export class BroadcastService {

  private profileUpdated = new Subject<User>();
  profileUpdated$ = this.profileUpdated.asObservable();

  private cartUpdated = new BehaviorSubject<number>(null);
  cartUpdated$ = this.cartUpdated.asObservable();

  private balanceUpdated = new BehaviorSubject<number>(null);
  balanceUpdated$ = this.balanceUpdated.asObservable();

  emitProfileUpdated(user: User) {
    this.profileUpdated.next(user);
  }

  emitCartUpdated(numberOfItems: number) {
    this.cartUpdated.next(numberOfItems);
  }

  emitBalanceUpdated(balance: number) {
    this.balanceUpdated.next(balance);
  }
}

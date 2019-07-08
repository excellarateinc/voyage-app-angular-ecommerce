import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from './user.model';
import { UserStatus } from './user-status.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
  private userSubscription = new BehaviorSubject<User>(null);
  userChanged$ = this.userSubscription.asObservable();

  private verificationSubscription = new BehaviorSubject<boolean>(null);
  verificationChanged$ = this.verificationSubscription.asObservable();

  private authenticationSubscription = new BehaviorSubject<boolean>(null);
  authenticationChanged$ = this.authenticationSubscription.asObservable();

  private isMenuShowing = new BehaviorSubject<boolean>(null);
  menuShowing$ = this.isMenuShowing.asObservable();

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${environment.API_URL}/users`);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.API_URL}/profiles/me`)
    .pipe(
      map(response => {
        this.userSubscription.next(response);
        return response;
      })
    );
  }

  toggleStatus(userId: string, status: UserStatus): Observable<User> {
    return this.http.put<User>(`${environment.API_URL}/users/${userId}/account-status`, status);
  }

  updateProfile(user: User): Observable<User> {
    return this.http.put<User>(`${environment.API_URL}/profiles/me`, user);
  }

  emitUserVerificationRequired(required: boolean): void {
    this.verificationSubscription.next(required);
  }

  emitUserAuthenticated(isAuthenticated: boolean): void {
    this.authenticationSubscription.next(isAuthenticated);
  }

  emitIsMenuShowing(showMenu: boolean): void {
    this.isMenuShowing.next(showMenu);
  }

}

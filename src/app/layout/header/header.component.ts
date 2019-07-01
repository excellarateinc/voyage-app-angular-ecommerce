import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'app/core/user/user.service';
import { AccountService } from 'app/core/accounts/account.service';
import { Account } from 'app/core/accounts/account.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input()
  isMobile = false;
  @Input()
  isAuthenticated = false;
  @Output() onToggleSidebar = new EventEmitter<void>();
  isVerificationRequired = false;
  isMenuShowing = false;

  accounts: Array<Account>;
  totalBalance: number = 0;
  constructor(private userService: UserService, private AccountService: AccountService) { }

  ngOnInit() {
    this.userService.verificationChanged$
    .subscribe(value => {
      this.isVerificationRequired = value;
    });

    this.userService.authenticationChanged$
    .subscribe(isAuthenticated => {
      if (isAuthenticated != null) {
        this.isAuthenticated = isAuthenticated;
      }
    });
    this.AccountService.getUserAccounts().subscribe(
      result => {this.accounts = result;
      this.totalBalance = this.AccountService.getTotalAccountsBalance(result);
    });
  }

  toggleSidebar(): void {
    this.onToggleSidebar.emit();
    this.isMenuShowing = !this.isMenuShowing;
  }
}

import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { UserService } from '../../core/user/user.service';
import { ThemeService } from '../../core/theme.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input()
  set isMobile(isMobile: boolean) {
    this.mobile = isMobile;
    if (!this.sidenav) {
      return;
    }
    if (this.mobile) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }
  @Input()
  isAuthenticated = false;
  @ViewChild(HeaderComponent) header;
  @ViewChild('sidenav') sidenav: MatSidenav;
  mobile: boolean;
  toggleTheme: false;
  isAdmin = false;
  isVerificationRequired = false;
  isMenuShowing = false;

  constructor(private userService: UserService, public themeService: ThemeService) { }

  ngOnInit(): void {
    this.userService.userChanged$
      .subscribe(user => {
        if (user) {
          this.isAdmin = user.roles.indexOf('Administrator') !== -1;
        }
      });

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
  }

  ngAfterViewInit(): void {
    this.isMenuShowing = this.header.isMenuShowing.subscribe;
  }

  toggle(): void {
    this.sidenav.toggle();
  }

  close(): void {
    if (!this.mobile) {
      return;
    }
    this.sidenav.close();
    this.header.isMenuShowing = !this.header.isMenuShowing;
  }
}

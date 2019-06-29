import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { UserService } from 'app/core/user/user.service';

@Injectable()
export class PublicGuardService implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService) { }

  canActivate(): boolean {
    const authenticated = this.authenticationService.isAuthenticated();
    if (authenticated) {
      this.userService.emitUserAuthenticated(true);
      this.router.navigate(['dashboard']);
      return false;
    }
    this.userService.emitUserAuthenticated(false);
    return true;
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }

  canLoad(): boolean {
    return this.canActivate();
  }
}

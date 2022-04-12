import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate, CanActivateChild {
  constructor(private authService: AuthService) {}
  canLoad(): boolean {
    return this.authService.isAuthorized();
  }
  canActivate(): boolean {
    return this.authService.isAuthorized();
  }
  canActivateChild(): boolean {
    return this.authService.isAuthorized();
  }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageTokenService } from './local-storage-token.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private _expTime = 900000;
  constructor(
    private _localStorageTokenService: LocalStorageTokenService,
    private _authService: AuthService,
    private _router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const payload = this._localStorageTokenService.parsePayload();
    if (payload) {
      this._authService.userName = payload.name;
      const expCondition = payload.exp + this._expTime > Date.now();
      if (!expCondition) {
        this._router.navigate(['auth']);
      }
      return expCondition;
    }
    this._router.navigate(['auth']);
    return false;
  }

  // private _parsePayload(token: string) {
  //   const payload64 = token.split('.')[1];
  //   return JSON.parse(atob(payload64)) as TTokenPayload;
  // }
}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageTokenService } from './local-storage-token.service';
import { TTokenPayload } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private _expTime = 900000;
  constructor(
    private _localStorageTokenService: LocalStorageTokenService,
    private _router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this._localStorageTokenService.get();
    if (token) {
      const payload = this._parsePayload(token);
      const expCondition = payload.exp + this._expTime > Date.now();
      if (!expCondition) {
        this._router.navigate(['auth']);
      }
      return expCondition;
    }
    this._router.navigate(['auth']);
    return false;
  }

  _parsePayload(token: string) {
    const payload64 = token.split('.')[1];
    return JSON.parse(atob(payload64)) as TTokenPayload;
  }
}

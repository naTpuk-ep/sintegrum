import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageTokenService } from './local-storage-token.service';
import { AuthService } from './auth.service';
import { JwtCodecService } from './jwt-codec.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private _expTime = 900000;
  constructor(
    private _localStorageTokenService: LocalStorageTokenService,
    private _authService: AuthService,
    private _jwtCodecService: JwtCodecService,
    private _router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this._localStorageTokenService.get();
    if (token) {
      const payload = this._jwtCodecService.parsePayload(token);
      if (this._isExpTimeCorrect(payload.exp)) {
        this._authService.setPayload(payload);
        return true;
      }
    }
    this._router.navigate(['auth']);
    return false;
  }
  private _isExpTimeCorrect(time: number) {
    return time + this._expTime > Date.now();
  }
}

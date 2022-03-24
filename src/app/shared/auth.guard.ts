import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LocalStorageTokenService } from './local-storage-token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private localStorageTokenService: LocalStorageTokenService,
    private _router: Router
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.localStorageTokenService.get()) {
      return true;
    }
    this._router.navigate(['auth']);
    return false;
  }
}

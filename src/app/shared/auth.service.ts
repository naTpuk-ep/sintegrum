import { Injectable } from '@angular/core';
import * as jwtEncode from 'jwt-encode';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageTokenService } from './local-storage-token.service';

export type TAuthFormValue = {
  name: string;
  password: string;
};

export type TUserPermissions = 'delete' | 'edit' | 'read';

export type TTokenPayload = {
  exp: number;
  name: string;
  permissions?: TUserPermissions[];
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token$!: Observable<string>;
  private _secret = 'secret';
  constructor(
    private _localStorageTokenService: LocalStorageTokenService,
    private _router: Router
  ) {}

  login(authFormValue$: Observable<TAuthFormValue>) {
    this.token$ = authFormValue$.pipe(switchMap((formValue) => of(this._getToken(formValue))));
    this.token$.subscribe((token) => {
      this._localStorageTokenService.set(token);
      this._router.navigate(['']);
    });
  }

  private _getToken({ name }: TAuthFormValue): string {
    const payload: TTokenPayload = {
      exp: Date.now(),
      name,
    };
    return jwtEncode(payload, this._secret);
  }
}

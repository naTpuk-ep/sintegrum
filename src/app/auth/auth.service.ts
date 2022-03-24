import { Injectable } from '@angular/core';
import * as jwtEncode from 'jwt-encode';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageTokenService } from '../shared/local-storage-token.service';

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

@Injectable()
export class AuthService {
  token$!: Observable<string>;
  private _secret = 'secret';
  constructor(private _localStorageTokenService: LocalStorageTokenService) {}

  loginSubscribe(authFormValue$: Observable<TAuthFormValue>) {
    this.token$ = authFormValue$.pipe(map(this._getToken.bind(this)));
    this.token$.subscribe((token) => {
      console.log(token);
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

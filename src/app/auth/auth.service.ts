import { Injectable } from '@angular/core';
import * as jwtEncode from 'jwt-encode';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export type TAuthFormValue = {
  login: string;
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
  // token$$ = new Subject<string>();
  private _tokenPayload!: TTokenPayload;
  private _secret = 'secret';
  constructor() {}

  login(authValue: TAuthFormValue) {
    const token$ = of(authValue).pipe(
      map(({ login }) => {
        this._tokenPayload = {
          exp: Date.now(),
          name: login,
        };
        return this._getToken();
      })
    );
    // this.token$$.pipe(
    //
    // )
  }
  //
  private _getToken(): string {
    return jwtEncode(this._tokenPayload, this._secret);
  }
}

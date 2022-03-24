import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';

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
  private _token!: string;
  private _tokenPayload!: TTokenPayload;
  private _tokenHeader = {
    alg: 'HS256',
    typ: 'JWT',
  };
  private _secret = 'secret';
  // private _tokenPayloadB64!: string;
  constructor() {}
  login(authValue: TAuthFormValue) {
    this._tokenPayload = {
      exp: 1,
      name: 'name',
    };
    this._token = this._getToken();
  }
  //
  private _getToken() {
    const header64 = btoa(JSON.stringify(this._tokenHeader)).split('=')[0];
    const payload64 = btoa(JSON.stringify(this._tokenPayload)).split('=')[0];
    const sha256 = crypto.HmacSHA256(`${header64}.${payload64}`, this._secret);
    const sha256Base64 = crypto.enc.Base64.stringify(sha256).split('=')[0];
    return `${header64}.${payload64}.${sha256Base64}`.replace(/\+/g, '-').replace(/\//g, '_');
  }
}

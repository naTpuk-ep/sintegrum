import { Injectable } from '@angular/core';

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
  private tokenPayload!: TTokenPayload;
  private tokenPayloadB64!: string;
  constructor() {}
  login(authValue: TAuthFormValue) {
    this.tokenPayload = {
      exp: Date.now(),
      name: authValue.login,
    };
    this.tokenPayloadB64 = btoa(JSON.stringify(this.tokenPayload));
  }
}

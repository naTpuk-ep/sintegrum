import { Injectable } from '@angular/core';
import * as jwtEncode from 'jwt-encode';
import { TTokenPayload } from './auth.service';

@Injectable()
export class JwtCodecService {
  private _secret = 'secret';
  encode(payload: TTokenPayload): string {
    return jwtEncode(payload, this._secret);
  }
  parsePayload(token: string) {
    const payload64 = token.split('.')[1];
    return JSON.parse(atob(payload64)) as TTokenPayload;
  }
}

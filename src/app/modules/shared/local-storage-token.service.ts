import { Injectable } from '@angular/core';
import { TTokenPayload } from './auth.service';

@Injectable()
export class LocalStorageTokenService {
  private _authKey = 'auth';

  parsePayload() {
    const tokenJson = this.get();
    if (!tokenJson) {
      return null;
    }
    const payload64 = tokenJson.split('.')[1];
    return JSON.parse(atob(payload64)) as TTokenPayload;
  }
  set(token: string) {
    localStorage.setItem(this._authKey, JSON.stringify(token));
  }
  get(): string | null {
    const tokenJson = localStorage.getItem(this._authKey);
    if (!tokenJson) return null;
    return JSON.parse(tokenJson);
  }
  remove() {
    localStorage.removeItem(this._authKey);
  }
}

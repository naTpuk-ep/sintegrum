import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageTokenService {
  private _authKey = 'auth';
  set(token: string) {
    localStorage.setItem(this._authKey, JSON.stringify(token));
  }
  get(): string | null {
    return localStorage.getItem(this._authKey);
  }
  remove() {
    localStorage.removeItem(this._authKey);
  }
}

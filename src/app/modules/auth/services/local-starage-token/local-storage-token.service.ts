import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageTokenService {
  private authKey = 'auth';
  set(token: string) {
    localStorage.setItem(this.authKey, JSON.stringify(token));
  }
  get(): string | null {
    const tokenJson = localStorage.getItem(this.authKey);
    if (!tokenJson) return null;
    return JSON.parse(tokenJson);
  }
  remove() {
    localStorage.removeItem(this.authKey);
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageTokenService } from './local-starage-token/local-storage-token.service';
import { JwtCodecService } from './jwt-codec/jwt-codec.service';

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
  payload!: TTokenPayload;
  private expTime = 3200000;
  constructor(
    private localStorageTokenService: LocalStorageTokenService,
    private jwtCodecService: JwtCodecService,
    private router: Router
  ) {}

  isAuthorized(): boolean {
    const token = this.localStorageTokenService.get();
    if (token) {
      const payload = this.jwtCodecService.parsePayload(token);
      if (this.isExpTimeCorrect(payload.exp)) {
        this.payload = payload;
        return true;
      }
    }
    this.logout();
    return false;
  }

  loginSubscribe(authFormValue$: Observable<TAuthFormValue>) {
    authFormValue$
      .pipe(
        switchMap((formValue) => {
          const payload = this.createPayload(formValue);
          const token = this.jwtCodecService.encode(payload);
          return of(token);
        })
      )
      .subscribe((token) => {
        this.localStorageTokenService.set(token);
        this.router.navigate(['']);
      });
  }

  logout() {
    this.router.navigate(['auth']);
  }

  resetLoginStatus() {
    this.localStorageTokenService.remove();
  }

  private isExpTimeCorrect(time: number) {
    return time + this.expTime > Date.now();
  }

  private createPayload({ name }: TAuthFormValue): TTokenPayload {
    return {
      exp: Date.now(),
      name,
    };
  }
}

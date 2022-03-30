import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageTokenService } from './local-storage-token.service';
import { JwtCodecService } from './jwt-codec.service';

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
  constructor(
    private _localStorageTokenService: LocalStorageTokenService,
    private _jwtCodecService: JwtCodecService,
    private _router: Router
  ) {}

  setPayload(payload: TTokenPayload) {
    this.payload = payload;
  }

  login(authFormValue$: Observable<TAuthFormValue>) {
    authFormValue$
      .pipe(
        switchMap((formValue) => {
          const payload = this._createPayload(formValue);
          const token = this._jwtCodecService.encode(payload);
          return of(token);
        })
      )
      .subscribe((token) => {
        this._localStorageTokenService.set(token);
        this._router.navigate(['']);
      });
  }

  logout(logout$: Observable<any>) {
    logout$.subscribe(() => {
      this._localStorageTokenService.remove();
      this._router.navigate(['auth']);
    });
  }

  private _createPayload({ name }: TAuthFormValue): TTokenPayload {
    return {
      exp: Date.now(),
      name,
    };
  }
}

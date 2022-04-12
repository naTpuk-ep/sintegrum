import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LocalStorageTokenService } from './local-starage-token/local-storage-token.service';
import { JwtCodecService } from './jwt-codec/jwt-codec.service';
import { ErrorHandlerService } from '../../error-handler/error-handler.service';

export type TUserPermissions = 'delete' | 'edit' | 'read';

export type TTokenPayload = {
  exp: number;
  name: string;
  permissions?: TUserPermissions[];
};

// eslint-disable-next-line no-shadow
export enum EAuthRoles {
  ADMIN = 'admin',
  USER = 'user',
}
export interface IUserRole {
  role: EAuthRoles;
  permissions?: TUserPermissions[];
}

export type TAuthFormValue = {
  name: string;
  password: string;
  role: IUserRole;
};

export const appUserRoles: IUserRole[] = [
  {
    role: EAuthRoles.USER,
    permissions: ['read'],
  },
  {
    role: EAuthRoles.ADMIN,
    permissions: ['delete', 'read', 'edit'],
  },
];

@Injectable()
export class AuthService {
  payload$ = new ReplaySubject<TTokenPayload>();
  logoutTrigger$ = new Subject();
  private tokenExpErrorMessage = 'Token has expired';
  private expTime = 900000;
  constructor(
    private localStorageTokenService: LocalStorageTokenService,
    private jwtCodecService: JwtCodecService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) {}

  isAuthorized(): boolean {
    const token = this.localStorageTokenService.get();
    if (token) {
      const payload = this.jwtCodecService.parsePayload(token);
      if (this.isExpTimeCorrect(payload.exp)) {
        this.payload$.next(payload);
        return true;
      }
      this.errorHandlerService.error$$.next(new Error(this.tokenExpErrorMessage));
    }
    this.payload$.next();
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
    this.localStorageTokenService.remove();
    this.logoutTrigger$.next();
    this.router.navigate(['auth']);
  }

  private isExpTimeCorrect(time: number) {
    return time + this.expTime > Date.now();
  }

  private createPayload(formValue: TAuthFormValue): TTokenPayload {
    return {
      exp: Date.now(),
      name: formValue.name,
      permissions: formValue.role.permissions,
    };
  }
}

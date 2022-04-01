import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { LocalStorageTokenService } from '../local-starage-token/local-storage-token.service';
import { AuthService } from '../auth.service';
import { JwtCodecService } from '../jwt-codec/jwt-codec.service';

@Injectable()
export class AuthGuard implements CanLoad {
  private expTime = 3200000;
  constructor(
    private localStorageTokenService: LocalStorageTokenService,
    private authService: AuthService,
    private jwtCodecService: JwtCodecService,
    private router: Router
  ) {}
  canLoad(): boolean {
    const token = this.localStorageTokenService.get();
    if (token) {
      const payload = this.jwtCodecService.parsePayload(token);
      if (this.isExpTimeCorrect(payload.exp)) {
        this.authService.setPayload(payload);
        return true;
      }
    }
    this.router.navigate(['auth']);
    return false;
  }
  private isExpTimeCorrect(time: number) {
    return time + this.expTime > Date.now();
  }
}

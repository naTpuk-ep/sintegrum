import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { LocalStorageTokenService } from '../local-starage-token/local-storage-token.service';
import { AuthService } from '../auth.service';
import { JwtCodecService } from '../jwt-codec/jwt-codec.service';

@Injectable()
export class AuthGuard implements CanLoad {
  private expTime = 3200000;
  constructor(
    private localStorageTokenService: LocalStorageTokenService,
    private authService: AuthService,
    private jwtCodecService: JwtCodecService
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
    this.authService.logout();
    return false;
  }
  private isExpTimeCorrect(time: number) {
    return time + this.expTime > Date.now();
  }
}

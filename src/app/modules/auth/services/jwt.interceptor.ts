import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageTokenService } from './local-storage-token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private localStorageTokenService: LocalStorageTokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtReq = request.clone({
      setHeaders: { Authorization: `Bearer ${this.localStorageTokenService.get()}` },
    });
    return next.handle(jwtReq);
  }
}

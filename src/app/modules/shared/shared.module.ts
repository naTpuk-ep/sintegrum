import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { JwtInterceptor } from './jwt.interceptor';
import { AuthGuard } from './auth.guard';
import { LocalStorageTokenService } from './local-storage-token.service';
import { SwapiHttpService } from './swapi-http.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AuthGuard,
    AuthService,
    LocalStorageTokenService,
    SwapiHttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}

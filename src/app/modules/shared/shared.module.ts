import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { JwtInterceptor } from './jwt.interceptor';
import { AuthGuard } from './auth.guard';
import { LocalStorageTokenService } from './local-storage-token.service';
import { SwapiHttpService } from './swapi-http.service';
import { JwtCodecService } from './jwt-codec.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AuthGuard,
    AuthService,
    LocalStorageTokenService,
    SwapiHttpService,
    JwtCodecService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}

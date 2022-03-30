import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './sevices/auth.service';
import { JwtInterceptor } from './sevices/jwt.interceptor';
import { AuthGuard } from './sevices/auth.guard';
import { LocalStorageTokenService } from './sevices/local-storage-token.service';
import { SwapiHttpService } from '../layout/services/swapi-http.service';
import { JwtCodecService } from './sevices/jwt-codec.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    AuthGuard,
    AuthService,
    LocalStorageTokenService,
    JwtCodecService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}

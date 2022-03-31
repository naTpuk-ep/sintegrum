import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthComponent } from './auth.component';
import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { JwtCodecService } from './services/jwt-codec.service';
import { LocalStorageTokenService } from './services/local-storage-token.service';
import { JwtInterceptor } from './services/jwt.interceptor';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  exports: [AuthComponent],
  providers: [AuthGuard, AuthService, LocalStorageTokenService, JwtCodecService],
})
export class AuthModule {}

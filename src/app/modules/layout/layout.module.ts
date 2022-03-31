import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SpinnerService } from './services/spinner.service';
import { LayoutRoutingModule } from './layout-routing.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LayoutComponent } from './layout.component';
import { HttpErrorHandlerService } from './services/http-error-handler.service';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { JwtInterceptor } from '../auth/services/jwt.interceptor';
import { HttpErrorComponent } from './components/http-error/http-error.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [LayoutComponent, ToolbarComponent, SpinnerComponent, HttpErrorComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    SpinnerService,
    HttpErrorHandlerService,
  ],
})
export class LayoutModule {}

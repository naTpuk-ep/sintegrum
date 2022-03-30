import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { SwapiHttpService } from './services/swapi-http.service';

@NgModule({
  declarations: [LayoutComponent, ToolbarComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [SwapiHttpService],
})
export class LayoutModule {}

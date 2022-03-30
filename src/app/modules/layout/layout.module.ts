import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutComponent } from './layout.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  declarations: [LayoutComponent, ToolbarComponent],
  imports: [CommonModule, LayoutRoutingModule, MatToolbarModule, MatButtonModule, MatIconModule],
})
export class LayoutModule {}

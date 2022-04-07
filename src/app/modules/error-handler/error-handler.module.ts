import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorHandlerService } from './error-handler.service';
import { ErrorComponent } from './error.component';

@NgModule({
  declarations: [ErrorComponent],
  imports: [CommonModule, MatIconModule, MatDialogModule],
  providers: [ErrorHandlerService],
})
export class ErrorHandlerModule {}

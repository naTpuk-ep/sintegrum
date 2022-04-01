import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { HttpErrorHandlerService } from './services/http-error-handler.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  error!: Error | null;
  constructor(
    public spinnerService: SpinnerService,
    public httpErrorHandlerService: HttpErrorHandlerService
  ) {
    this.httpErrorHandlerService.error$$.subscribe((error) => {
      this.error = error;
    });
  }
}

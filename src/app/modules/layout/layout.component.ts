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
  constructor(
    public spinnerService: SpinnerService,
    public httpErrorHandlerService: HttpErrorHandlerService
  ) {}
}

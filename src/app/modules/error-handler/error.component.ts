import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ErrorHandlerService } from './error-handler.service';

@Component({
  selector: 'app-http-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  constructor(public errorHandlerService: ErrorHandlerService) {}
}

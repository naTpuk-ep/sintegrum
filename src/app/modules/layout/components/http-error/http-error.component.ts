import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpErrorHandlerService } from '../../services/http-error-handler.service';

@Component({
  selector: 'app-http-error',
  templateUrl: './http-error.component.html',
  styleUrls: ['./http-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpErrorComponent {
  constructor(public httpErrorHandlerService: HttpErrorHandlerService) {}
}

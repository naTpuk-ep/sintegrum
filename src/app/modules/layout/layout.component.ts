import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SpinnerService } from './services/spinner/spinner.service';
import { ErrorHandlerService } from '../error-handler/error-handler.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  error$$?: Subject<Error>;
  constructor(
    public spinnerService: SpinnerService,
    public httpErrorHandlerService: ErrorHandlerService
  ) {}
  ngOnInit() {
    this.error$$ = this.httpErrorHandlerService.error$$;
  }
}

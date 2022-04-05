import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, ReplaySubject, Subject, Subscription } from 'rxjs';
import { SpinnerService } from './services/spinner/spinner.service';
import { HttpErrorHandlerService } from './services/http-error-handler/http-error-handler.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  error$$?: ReplaySubject<Error>;
  constructor(
    public spinnerService: SpinnerService,
    public httpErrorHandlerService: HttpErrorHandlerService
  ) {}
  ngOnInit() {
    this.error$$ = this.httpErrorHandlerService.error$$;
  }
}

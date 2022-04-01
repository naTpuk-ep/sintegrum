import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SpinnerService } from './services/spinner/spinner.service';
import { HttpErrorHandlerService } from './services/http-error-handler/http-error-handler.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  error!: Error | null;
  spinnerStatus!: boolean;
  constructor(
    public spinnerService: SpinnerService,
    public httpErrorHandlerService: HttpErrorHandlerService
  ) {}
  ngOnInit() {
    this.httpErrorHandlerService.error$$.subscribe((error) => {
      this.error = error;
    });
    this.spinnerService.status$$.subscribe((status) => {
      this.spinnerStatus = status;
    });
  }
  get viewContent(): boolean {
    return !this.error && !this.spinnerStatus;
  }
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  spinner?: boolean;
  constructor(
    public spinnerService: SpinnerService,
    public errorHandlerService: ErrorHandlerService,
    private cdRef: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.spinnerService.status$$.subscribe((spinner) => {
      this.spinner = spinner;
      this.cdRef.detectChanges();
    });
  }
}

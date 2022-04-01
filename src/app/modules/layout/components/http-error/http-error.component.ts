import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-http-error',
  templateUrl: './http-error.component.html',
  styleUrls: ['./http-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpErrorComponent {
  @Input() error!: Error | null;
}

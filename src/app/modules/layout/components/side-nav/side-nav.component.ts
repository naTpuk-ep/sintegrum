import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SideNavService } from '../../services/sidenav/side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent {}

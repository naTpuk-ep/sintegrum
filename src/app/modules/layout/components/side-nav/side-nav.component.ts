import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { Observable } from 'rxjs';
import { SideNavService } from '../../services/sidenav/side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements AfterViewInit {
  toggler$!: Observable<boolean>;
  constructor(public sideNavService: SideNavService) {}
  ngAfterViewInit() {
    this.toggler$ = this.sideNavService.toggler$;
  }
}

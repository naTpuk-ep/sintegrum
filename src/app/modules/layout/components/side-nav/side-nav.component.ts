import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { SideNavService } from '../../services/sidenav/side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavComponent implements AfterViewInit {
  toggler = this.sideNavService.toggleInitState;
  constructor(private sideNavService: SideNavService, private cdRef: ChangeDetectorRef) {}
  ngAfterViewInit() {
    this.sideNavService.toggler$.subscribe((toggler) => {
      this.toggler = toggler;
      this.cdRef.detectChanges();
    });
  }
}

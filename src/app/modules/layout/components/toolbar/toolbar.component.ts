import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { fromEvent } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { SideNavService } from '../../services/sidenav/side-nav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @ViewChild('logOutBtn') logOutBtnRef!: MatButton;
  @ViewChild('menuToggleBtn') menuToggleBtn!: MatButton;
  userName!: string;
  constructor(private authService: AuthService, private sideNavService: SideNavService) {}

  ngOnInit() {
    this.userName = this.authService.payload.name;
  }

  ngAfterViewInit() {
    this.observeLogout();
    this.observeMenuExpandToggle();
  }

  private observeMenuExpandToggle() {
    this.sideNavService.toggler$ = fromEvent(this.menuToggleBtn._getHostElement(), 'click');
  }

  private observeLogout() {
    fromEvent(this.logOutBtnRef._getHostElement(), 'click').subscribe(() => {
      this.authService.logout();
    });
  }
}

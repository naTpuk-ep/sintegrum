import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { fromEvent, Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { SideNavService } from '../../services/sidenav/side-nav.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent implements AfterViewInit, OnDestroy {
  @ViewChild('logOutBtn') logOutBtnRef!: MatButton;
  @ViewChild('menuToggleBtn') menuToggleBtn!: MatButton;
  private subscriptions: Subscription[] = [];
  constructor(private sideNavService: SideNavService, public authService: AuthService) {}

  ngAfterViewInit() {
    this.observeLogout();
    this.observeMenuExpandToggle();
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  private observeMenuExpandToggle() {
    this.sideNavService.toggler$ = fromEvent(this.menuToggleBtn._getHostElement(), 'click');
  }

  private observeLogout() {
    this.subscriptions.push(
      fromEvent(this.logOutBtnRef._getHostElement(), 'click').subscribe(() => {
        this.authService.logout();
      })
    );
  }
}

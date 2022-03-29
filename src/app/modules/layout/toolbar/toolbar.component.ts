import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { fromEvent } from 'rxjs';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements AfterViewInit {
  @ViewChild('logOutBtn') logOutBtnRef!: MatButton;
  userName = this._authService.userName;
  constructor(private _authService: AuthService) {}

  ngAfterViewInit() {
    this._observeLogout();
  }
  private _observeLogout() {
    const logout$ = fromEvent(this.logOutBtnRef._getHostElement(), 'click');
    this._authService.logout(logout$);
  }
}
